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
    dag_id='get_all_finance_cash_flow',
    default_args=default_args,
    description='Get all finance cash flow data',
    catchup=False
)
def get_all_finance_cash_flow(**kwargs):

    @task(task_id='reset_finance_cash_flow_table')
    def reset_finance_cash_flow_table():
        pg_hook = PostgresHook(postgres_conn_id)
        connection = pg_hook.get_conn()
        cursor = connection.cursor()

        query = "DELETE FROM stock.finance_cash_flow;"
        cursor.execute(query)
        connection.commit()

        connection.close()

    @task(task_id='get_all_finance_cash_flow_table')
    def get_all_finance_cash_flow_table():
        vnstock = VnStockClient()
        data = vnstock.get_list_finance_cash_flow()

        engine = create_engine(postgres_connection_url)
        data.to_sql('finance_cash_flow', con=engine, if_exists='append', index=False, schema='stock', chunksize=10000)

        print("Get all finance cash flow table success")

    reset_finance_cash_flow_table()
    get_all_finance_cash_flow_table()

get_all_finance_cash_flow()