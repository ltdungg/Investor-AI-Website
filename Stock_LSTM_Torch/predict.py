from pathlib import Path
from data.minio_data import get_data
from src.model import PriceModel
from data.process import process
import torch
import pandas as pd
import torch.nn as nn
import numpy as np
import matplotlib.pyplot as plt
from data.load_posgres import load_df_to_postgres


def predict_future(ticker, dataframe, n_days_future=7, sequence_length=3, model_path=None):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    if model_path is None:
        model_path = f"./saved_model/{ticker}_model.pth"

    model = PriceModel(input_size=1)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()

    processor = process(ticker)

    # Process the input dataframe
    try:
        df = pd.DataFrame(dataframe)

        # Handle time column
        if 'time' in df.columns:
            df['time'] = pd.to_datetime(df['time'])
            df.set_index('time', inplace=True)
        else:
            df.index = pd.to_datetime(df.index)
    except ValueError as e:
        print(f"Error processing data: {e}")
        return None

    if df.empty or len(df) <= sequence_length:
        print("Not enough data to predict.")
        return None

    original_close = df['close'].copy()
    df = processor.data_scaling(df, fit=False)

    last_sequence = df['close'].values[-sequence_length:]  # Assuming 'close' is the target column
    last_sequence = last_sequence.reshape(1, sequence_length, 1)  # (batch, seq_len, feature)
    last_sequence = torch.tensor(last_sequence, dtype=torch.float32).to(device)

    predictions = []

    model.eval()
    for _ in range(n_days_future):
        with torch.no_grad():
            pred = model(last_sequence)  # Output (batch, 1)
            pred_value = pred.item()
            predictions.append(pred_value)

        # Update input for the next prediction
        last_sequence = last_sequence.squeeze(0).cpu().numpy()  # (seq_len, feature)
        last_sequence = np.append(last_sequence, pred_value)
        last_sequence = last_sequence[-sequence_length:]
        last_sequence = torch.tensor(last_sequence.reshape(1, sequence_length, 1), dtype=torch.float32).to(device)

    # Inverse scaling predictions
    predictions = np.array(predictions).reshape(-1, 1)
    y_pred = processor.inverse_scale(predictions)

    # Create dates for forecasted data
    last_date = df.index[-1]
    future_dates = pd.date_range(start=last_date + pd.Timedelta(days=1), periods=n_days_future,
                                 freq='B')  # 'B' = business days

    result_df = pd.DataFrame({
        "date": future_dates,
        "predicted_price": y_pred.flatten()
    })

    # # Plot historical and predicted data
    # plt.figure(figsize=(12, 6))
    # # Plot historical close prices
    # plt.plot(original_close.index, original_close.values, label='Historical Close Price', color='blue')
    # # Plot predicted prices
    # plt.plot(future_dates, y_pred.flatten(), label='Predicted Price', color='red', linestyle='--')
    # plt.title(f'{ticker} Stock Price Prediction')
    # plt.xlabel('Date')
    # plt.ylabel('Price')
    # plt.legend()
    # plt.grid(True)
    # plt.xticks(rotation=45)
    # plt.tight_layout()
    # plt.savefig(f'./plot_predictions/{ticker}_price_prediction.png')

    return result_df


if __name__ == "__main__":
    folder_path = Path('/Stock_LSTM_Torch/saved_model')
    file_list = [f.name for f in folder_path.iterdir() if f.is_file()]
    symbol_list = [name.split('_')[0] for name in file_list]

    print(symbol_list)

    for symbol in symbol_list:
        df = get_data(symbol)
        print(f"Processing symbol: {symbol}")
        if type(df) != int:
            print(df.info())

            df_future = predict_future(
                ticker=symbol,
                dataframe=df,
                n_days_future=16,
                sequence_length=3
            )

            df_future['symbol'] = symbol
            df_future.rename(columns={'predicted_price': 'price'}, inplace=True)

            df_future['date'] = pd.to_datetime(df_future['date'])
            df_weekdays = df_future[~df_future['date'].dt.weekday.isin([5, 6])]

            load_df_to_postgres(table='predicted_stock', schema='stock', df=df_weekdays)

            print(df_weekdays)
        else:
            continue
