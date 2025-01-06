from airflow.decorators import dag, task
from airflow.providers.postgres.hooks.postgres import PostgresHook
from datetime import datetime, timedelta
import pandas as pd
from modules.ssi_client import SSIClient
from modules.vnstock_client import VnStockClient
from modules.extract import SSI_AUTHENTICATION

postgres_conn_id = "postgres"
history_price_table = 'stock.stock_price'

def get_history_price():
    print("Bắt đầu lấy dữ liệu lịch sử giá các mã...")
    time_start = datetime.now()
    vnstock = VnStockClient()

    ssi = SSIClient(SSI_AUTHENTICATION)

    stock_dict = vnstock.get_stock_dict()
    data = ssi.get_all_history_price(stock_dict)

    time_end = datetime.now()
    print(f"Tổng thời gian lấy dữ liệu giá {(time_end - time_start).total_seconds()}s")
    return data

default_args = {
    'owner': 'InvestorAI',
    'start_date': datetime(2025, 1, 5),
    'email': 'admin@investorai.live',
    'retries': 3,
    'retry_delay': timedelta(minutes=5)
}

@dag(
    dag_id='get_all_history_price',
    default_args=default_args,
    schedule_interval=None
)
def get_all_history_price():
    
    @task(task_id='extract')
    def extract():
        data = get_history_price()
        
        return data 
    
    @task(task_id='transform')
    def transform(data: pd.DataFrame):
        if data.empty:
            return pd.DataFrame()

        data = data.drop(columns=['Time'])
        
        data['TradingDate'] = pd.to_datetime(data['TradingDate'], format='%d/%m/%Y').dt.date
        
        
        data = data[data['Symbol'].str.len() == 3]
        
        return data
    
    @task(task_id='load') 
    def load(data: pd.DataFrame):
        if data.empty:
            return
        
        pg_hook = PostgresHook(postgres_conn_id=postgres_conn_id)
        connection = pg_hook.get_conn()
        
        cur = connection.cursor()
        
        # DELETE ALL STOCK INFORMATION AND GET IT AGAIN
        delete_query = f'DELETE FROM {history_price_table}'
        
        try:
            cur.execute(delete_query)
            connection.commit()
        except: 
            pass
        else:
            for index, row in data.iterrows():
                insert_query = "INSERT INTO stock.stock_price (symbol, exchange, trading_date, open, high, low, close, volume, value) \
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
                data = (row['Symbol'], row['Exchange'], row['TradingDate'], row['Open'], row['High'], row['Low'], row['Close'], row['Volume'], row['Value'])
                cur.execute(insert_query, data)
                connection.commit()
            
            print("Get all stock history price success")
            
        
        cur.close()
        connection.close()
    
    data = extract()
    transformed_data = transform(data)
    load(transformed_data)
    

get_all_history_price()