from airflow.decorators import dag, task, task_group
from airflow.providers.postgres.hooks.postgres import PostgresHook
from datetime import datetime, timedelta
import time
import pandas as pd
from airflow.utils.helpers import chain
import math
from modules.ssi_client import SSIClient
from modules.vnstock_client import VnStockClient
from sqlalchemy import create_engine
from modules.extract import SSI_AUTHENTICATION

postgres_conn_id = "postgres"
history_price_table = 'stock.stock_price'
vnstock = VnStockClient()
ssi = SSIClient(SSI_AUTHENTICATION)
stock_dict = vnstock.get_stock_dict()
total_stocks = len(stock_dict['symbol'])

default_args = {
    'owner': 'InvestorAI',
    'start_date': datetime(2025, 1, 5),
    'email': 'admin@investorai.live',
    'retries': 3,
    'retry_delay': timedelta(minutes=5)
}

@task(task_id='begin_task')
def begin_task():
    pg_hook = PostgresHook(postgres_conn_id=postgres_conn_id)
    connection = pg_hook.get_conn()
    cur = connection.cursor()
    
    # DELETE ALL STOCK INFORMATION AND GET IT AGAIN
    delete_query = f'DELETE FROM {history_price_table}'
    cur.execute(delete_query)
    connection.commit()
    cur.close()
    connection.close()

@task()
def extract(stocks_dict: dict):
    print("Bắt đầu lấy dữ liệu lịch sử giá các mã...")
    time_start = datetime.now()
    
    data = ssi.get_all_history_price(stocks_dict)

    time_end = datetime.now()
    print(f"Tổng thời gian lấy dữ liệu giá {(time_end - time_start).total_seconds()}s")
    return data

@task()
def transform(data: pd.DataFrame):
    if data.empty:
        return pd.DataFrame()

    data = data.drop(columns=['Time'])
    
    data['TradingDate'] = pd.to_datetime(data['TradingDate'], format='%d/%m/%Y').dt.date
    
    
    data = data[data['Symbol'].str.len() == 3]
    
    data.rename(columns={'Symbol': 'symbol', 'Exchange': 'exchange', 'TradingDate': 'trading_date',
                            'Open': 'open', 'High': 'high', 'Low': 'low', 'Close': 'close', 'Volume': 'volume', 'Value': 'value'}, errors="raise", inplace=True)
    
    return data

@task() 
def load(data: pd.DataFrame):
    if data.empty:
        print("Load không thành công vì không có dữ liệu được truyền vào")
        return
    columns = ['symbol', 'exchange', 'trading_date','open','high','low','close','volume','value']
    
    connection_url = 'postgresql+psycopg2://airflow:airflow@postgres/airflow'
    engine = create_engine(connection_url)
    
    data[columns].to_sql('stock_price',con=engine, schema='stock', if_exists='append', index=False, chunksize=10000)
    
    print("Get all stock history price success")

@task()
def wait_for_next():
    time.sleep(30)

@dag(
    dag_id='get_all_history_price',
    default_args=default_args,
    schedule_interval=None
)
def get_all_history_price():
    
    stock_per_time = 50

    begin_task()
    
    total_run_loops = math.ceil(total_stocks/stock_per_time)
    tasks = []
    
    start_index = 0
    
    for i in range(0, total_run_loops+1):
        
        if (start_index >= total_stocks):
            break   
        
        if (start_index + stock_per_time) < total_stocks:
            number_of_stock_in_dict = stock_per_time
        else:
            number_of_stock_in_dict = total_stocks - start_index
        
        stocks_dict = {
            'symbol': stock_dict['symbol'][start_index:(start_index+number_of_stock_in_dict)],
            'exchange': stock_dict['exchange'][start_index:(start_index+number_of_stock_in_dict)]
        }
        
        data = extract.override(task_id=f'extract_{start_index}')(stocks_dict)
        
        transformed_data = transform.override(task_id=f'transform_{start_index}')(data)
        
        loaded_data = load.override(task_id=f'load_{start_index}')(transformed_data)
        
        tasks.extend([data, transformed_data, loaded_data, wait_for_next.override(task_id=f'wait_{start_index}')()])
        
        start_index += number_of_stock_in_dict
        
    chain(*tasks)

get_all_history_price()