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
    dag_id='get_all_finance_income_statement',
    default_args=default_args,
    description='Get all finance income statement data',
    catchup=False,
    schedule_interval='0 3 1 4,7,10,1 *'
)
def get_all_income_statement_ratio(**kwargs):


    @task(task_id='get_all_finance_income_statement')
    def get_all_finance_income_statement():
        vnstock = VnStockClient()
        data = vnstock.get_list_finance_income_statement()

        engine = create_engine(postgres_connection_url)
        data.to_sql('finance_income_statement', con=engine, if_exists='replace', index=False, schema='stock', chunksize=10000)

        print("Get all finance cash flow table success")

    get_all_finance_income_statement()

get_all_income_statement_ratio()