import torch
import numpy as np
import os
import pandas as pd
from data.process import process
from src.model import PriceModel
from src.optimizer import Optimizer
from src.train import Trainer
from src.plot import Plotter

BUCKET = 'investor-ai-bucket'
MINIO_ENDPOINT = "http://minio:9000"
MINIO_ACCESS_KEY = "TktAgssvy0kF6xoz3zE5"
MINIO_SECRET_KEY = "yO6dE1PLYtNRvyhEwGYOSxXrfMxTHO3XNdNF7OZl"

def get_data(symbol):
    storage_options = {
        "key": MINIO_ACCESS_KEY,
        'secret': MINIO_SECRET_KEY,
        "client_kwargs": {
            "endpoint_url": f"{MINIO_ENDPOINT}"
        }
    }
    df = pd.read_parquet(f"s3a://{BUCKET}/RAW_STOCK_DATA/symbol={symbol}",
                         engine='fastparquet',
                         storage_options=storage_options)

    df['ticker'] = symbol
    df = df[['ticker', 'trading_date', 'close']]
    df = df.sort_values(by='trading_date', ascending=True)
    df.rename(columns={'trading_date': 'time'}, inplace=True)
    df['time'] = pd.to_datetime(df['time'])
    time_filtered = df[df['time'].dt.year >= df['time'].dt.year.max() - 2]
    print(time_filtered)

    return time_filtered

def main(dataframe):
 
    sequence_length = 3
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(device)

    all_dates, all_X, all_y = [], [], []

    for ticker, ticker_data in dataframe.groupby('ticker'):
        print(f"Processing ticker : {ticker}")

        processor = process(scaler_path=f"./scalers/{ticker}_scaler.save")

        df = processor.fetch_data(ticker_data)
        df = processor.data_scaling(df, fit=not os.path.exists(processor.scaler_path))

        if df.empty:
            print(f"No data for ticker {ticker}")
            continue
    
        valid_start = df.index[sequence_length]
        valid_end = df.index[-1]
    
    
        window_df = processor.df_to_windowed_df(df, valid_start, valid_end, n=sequence_length)
        if window_df.empty:
            print("Create window failed")
            continue
    
        dates, X, y = processor.window_df_to_date_X_y(window_df)

        all_dates.extend(dates)
        all_X.extend(X)
        all_y.extend(y)
    
    if len(all_X) == 0:
        print("No data available")
        return

    all_X = np.array(all_X).reshape(-1, sequence_length, 1)
    all_y = np.array(all_y)

    indices = np.random.permutation(len(all_X))
    all_X = all_X[indices]
    all_y = all_y[indices]

    split_idx = int(len(all_X) * 0.8)
    X_train, y_train = all_X[:split_idx], all_y[:split_idx]
    X_test, y_test = all_X[split_idx:], all_y[split_idx:]

    model = PriceModel(input_size=1)
    optimizer_setup = Optimizer(model, X_train, y_train, batch_size=16, learning_rate=1e-3, device=device)


    trainer = Trainer(
        model=optimizer_setup.model,
        optimizer=optimizer_setup.optimizer,
        loss_fn=optimizer_setup.loss_fn,
        loader=optimizer_setup.loader,
        X_train_tensor=optimizer_setup.X_train_tensor,
        y_train_tensor=optimizer_setup.y_train_tensor,
        X_test=X_test,
        y_test=y_test,
        device=device,
    )

    trainer.train(n_epochs=8000, eval_every=100)
    
    os.makedirs('./saved_model', exist_ok=True)
    torch.save(model.state_dict(), './saved_model/model.pth')

if __name__ == "__main__":
    symbol = 'FPT'
    df = get_data(symbol)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(device)
    # main(df)
