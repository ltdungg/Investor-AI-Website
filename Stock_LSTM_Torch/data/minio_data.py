import pandas as pd
import datetime

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
    try:
        df = pd.read_parquet(f"s3a://{BUCKET}/RAW_STOCK_DATA/symbol={symbol}",
                             engine='fastparquet',
                             storage_options=storage_options)
    except Exception as e:
        raise Exception(f"Error: {e}")
    else:
        df['ticker'] = symbol
        df = df[['ticker', 'trading_date', 'close']]
        df = df.sort_values(by='trading_date', ascending=True)
        df.rename(columns={'trading_date': 'time'}, inplace=True)
        df['time'] = pd.to_datetime(df['time'])

        time_filtered = df[df['time'].dt.year >= df['time'].dt.year.max() - 2]

        max_time = df['time'].max()
        one_month_ago = datetime.datetime.now() - datetime.timedelta(days=30)

        if max_time < one_month_ago:
            print("Cổ phiếu này không được giao dịch gần đây!")
            return -1

        return time_filtered

if __name__ == '__main__':
    df = get_data('FPT')
    print(df)