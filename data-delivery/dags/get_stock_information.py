from airflow.decorators import dag, task
from airflow.providers.postgres.hooks.postgres import PostgresHook
from datetime import datetime, timedelta
import pandas as pd
from modules.ssi_client import SSIClient
from modules.vnstock_client import VnStockClient
from modules.extract import SSI_AUTHENTICATION

postgres_conn_id = "postgres"
stock_information_table = 'stock.stock_information'
industries_code_table = 'stock.industries'


def get_company_information() -> pd.DataFrame:
    print("Bắt đầu lấy dữ liệu thông tin các công ty...")
    time_start = datetime.now()
    vnstock = VnStockClient()

    data = vnstock.get_all_companies_profile()

    time_end = datetime.now()
    print(f"Tổng thời gian lấy dữ liệu thông tin các công ty {(time_end - time_start).total_seconds()}s")
    return data

default_args = {
    'owner': 'InvestorAI',
    'start_date': datetime(2025, 1, 5),
    'email': 'admin@investorai.live',
    'retries': 3,
    'retry_delay': timedelta(minutes=5)
}

@dag(
    dag_id='get_stock_information',
    default_args=default_args,
    schedule='0 18 * * 6',
    catchup=False
)
def get_stock_information():
    
    @task(task_id='extract_industries_code')
    def extract_industries_code() -> pd.DataFrame:
        vnstock = VnStockClient()
        
        data = vnstock.get_industries_icb()
        
        return data
    
    @task(task_id='load_industries_code')
    def load_industries_code(data: pd.DataFrame):
        if data.empty:
            return
        
        pg_hook = PostgresHook(postgres_conn_id=postgres_conn_id)
        connection = pg_hook.get_conn()
        cur = connection.cursor()
        
        # DELETE ALL INDUSTRIES
        delete_query = f'DELETE FROM {industries_code_table}'
        try:
            cur.execute(delete_query)
            connection.commit()
        except: 
            pass
        else:
            for index, row in data.iterrows():
                insert_query = "INSERT INTO " + industries_code_table + " (icb_id, icb_name, en_icb_name, level) \
                    VALUES (%s, %s, %s, %s)"
                
                data = (row['icb_code'], row['icb_name'], row['en_icb_name'], row['level'])
                
                cur.execute(insert_query, data)
                connection.commit()
        
        cur.close()
        connection.close()
    
    @task(task_id='extract_and_transform_stock_information')
    def extract_and_transform_stock_information() -> pd.DataFrame:
        data = get_company_information()
        return data 
    
    @task(task_id='load_stock_information') 
    def load_stock_information(data: pd.DataFrame):
        
        if data.empty:
            return
        
        pg_hook = PostgresHook(postgres_conn_id=postgres_conn_id)
        connection = pg_hook.get_conn()
        
        cur = connection.cursor()
        
        # DELETE ALL STOCK INFORMATION AND GET IT AGAIN
        delete_query = f'DELETE FROM {stock_information_table}'
        
        try:
            cur.execute(delete_query)
            connection.commit()
        except: 
            pass
        else:
            for index, row in data.iterrows():
                insert_query = "INSERT INTO stock.stock_information (symbol, company_name, description, icb1, icb2, icb3, icb4, exchange, history_dev, company_promise, business_risk, key_developments, business_strategies) \
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                data = (row['symbol'],row['company_name'] ,row['company_profile'], row['icb_code1'], row['icb_code2'], row['icb_code3'], row['icb_code4'], 
                           row['exchange'], row['history_dev'], row['company_promise'], row['business_risk'], row['key_developments'], row['business_strategies'])
                print(insert_query)
                cur.execute(insert_query, data)
                connection.commit()
        
        cur.close()
        connection.close()
        
    load_industries_code(extract_industries_code())
    load_stock_information(extract_and_transform_stock_information())
    
    

get_stock_information()