from airflow.decorators import dag, task
from modules.vnstock_client import VnStockClient
import pandas as pd
from datetime import datetime, timedelta
from airflow.providers.postgres.hooks.postgres import PostgresHook
from sqlalchemy import create_engine

postgres_conn_id = 'postgres'
postgres_connection_url = 'postgresql+psycopg2://airflow:airflow@postgres/airflow'

default_args = {
    'owner': 'InvestorAI',
    'start_date': datetime(2025, 2, 21)
}

@dag(
    dag_id='get_all_finance_balance_sheet',
    default_args=default_args,
    description='Get all finance balance sheet data',
    catchup=False,
    schedule_interval='0 1 1 4,7,10,1 *'
)
def get_all_finance_balance_sheet(**kwargs):

    @task(task_id='get_all_finance_balance_sheet_table')
    def get_all_finance_balance_sheet_table():
        vnstock = VnStockClient()
        data = vnstock.get_list_of_stock_finance_balance_sheet()

        engine = create_engine(postgres_connection_url)
        data.to_sql('finance_balance_sheet', con=engine, if_exists='replace', index=False, schema='stock', chunksize=10000)

        print("Get all finance balance sheet table success")

    get_all_finance_balance_sheet_table()

get_all_finance_balance_sheet()