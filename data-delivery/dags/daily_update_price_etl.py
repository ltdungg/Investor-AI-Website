from airflow.decorators import dag, task
from airflow.providers.postgres.hooks.postgres import PostgresHook
from datetime import datetime, timedelta
import pandas as pd
from modules.ssi_client import SSIClient
from modules.extract import SSI_AUTHENTICATION

postgres_conn_id = "postgres"

def get_daily_price(from_date: str = None, to_date: str = None):

    print("Bắt đầu lấy dữ liệu lịch sử giá hằng ngày...")

    time_start = datetime.now()
    ssi = SSIClient(SSI_AUTHENTICATION)
    data = ssi.get_daily_price(from_date=from_date, to_date=to_date)
    time_end = datetime.now()

    print(f"Tổng thời gian lấy dữ liệu giá {(time_end - time_start).total_seconds()}s")

    return data

default_args = {
    'owner': 'InvestorAI',
    'start_date': datetime(2025, 1, 6),
    'email': 'admin@investorai.live',
    'retries': 3,
    'retry_delay': timedelta(minutes=5)
}

@dag(
    dag_id='update_daily_stock_price',
    default_args=default_args,
    schedule='30 8 * * *',
    catchup=True
)
def update_daily_stock_price():
    @task(task_id='extract')
    def extract(ds, **kwargs) -> pd.DataFrame:
        
        date = kwargs['execution_date'].strftime('%d/%m/%Y')
        print(f"Execution date: {date}")
        data = get_daily_price(date, date)

        return data

    @task(task_id='transform')
    def transform(data: pd.DataFrame) -> pd.DataFrame:
        
        if data.empty:
            return pd.DataFrame()

        data = data.drop(columns=['Time'])

        data['Market'] = data['Market'].fillna("INDEX")
        
        data['TradingDate'] = pd.to_datetime(data['TradingDate'], format='%d/%m/%Y').dt.date

        data = data[~(data['Market'] == "INDEX")]
        data = data[~(data['Market'] == "DERIVATIVES")]
        
        
        data = data[data['Symbol'].str.len() == 3]
        
        return data
        

    @task(task_id='load')
    def load(data: pd.DataFrame, **kwargs):
        
        if data.empty:
            print(f"Không có dữ liệu ngày {kwargs['execution_date'].strftime('%d/%m/%Y')}")
            return
        
        pg_hook = PostgresHook(postgres_conn_id=postgres_conn_id)
        connection = pg_hook.get_conn()
        cur = connection.cursor()
        
        for index, row in data.iterrows():
            query = f"INSERT INTO stock.stock_price (symbol, exchange, trading_date, open, high, low, close, volume, value) \
                    VALUES ('{row['Symbol']}', '{row['Market']}', '{row['TradingDate']}', {row['Open']}, {row['High']}, {row['Low']}, {row['Close']}, {row['Volume']}, {row['Value']})"
            try:
                cur.execute(query=query)
                connection.commit()

            except:

                connection.rollback()
                update_query = """UPDATE stock.stock_price
                SET "open" = %s, "high"= %s, "low"= %s, "close"= %s, "volume"= %s, "value"= %s
                WHERE "symbol" = %s AND "trading_date" = %s"""
                data = (row['Open'], row['High'], row['Low'], row['Close'], 
                        row['Volume'], row['Value'], row['Symbol'], row['TradingDate'])
                cur.execute(update_query, data)
                connection.commit()
            
        cur.close()
        connection.close()
        
    extract = extract()
    transform = transform(extract)
    load(transform)
    
    
update_daily_stock_price()