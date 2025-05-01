from airflow.decorators import dag, task
from airflow.providers.postgres.hooks.postgres import PostgresHook
from datetime import datetime, timedelta
import pandas as pd
from modules.ssi_client import SSIClient
from modules.vnstock_client import VnStockClient
from modules.extract import SSI_AUTHENTICATION
from psycopg2.extras import execute_values

postgres_conn_id = "postgres"
stock_information_table = 'stock.stock_information'
industries_code_table = 'stock.industries'


def get_company_information() -> pd.DataFrame:
    print("Bắt đầu lấy dữ liệu thông tin các công ty...")
    time_start = datetime.now()
    vnstock = VnStockClient()

    data = vnstock.get_all_companies_profile()
    print(data)

    time_end = datetime.now()
    print(f"Tổng thời gian lấy dữ liệu thông tin các công ty {(time_end - time_start).total_seconds()}s")
    return data


default_args = {
    'owner': 'InvestorAI',
    'start_date': datetime(2025, 1, 5),
    'retries': 0,
    'retry_delay': timedelta(minutes=5)
}


@dag(
    dag_id='update_stock_information',
    default_args=default_args,
    schedule='0 18 * * 6',
    catchup=False
)
def update_stock_information():
    @task(task_id='extract_and_transform_stock_information')
    def extract_and_transform_stock_information() -> pd.DataFrame:
        data = get_company_information()
        return data

    @task(task_id='load_stock_information')
    def load_stock_information(data: pd.DataFrame):

        if data.empty:
            return

        pg_hook = PostgresHook(postgres_conn_id=postgres_conn_id)
        conn = pg_hook.get_conn()

        cursor = conn.cursor()

        # DELETE ALL STOCK INFORMATION AND GET IT AGAIN

        UPDATE_QUERY = f"""
            UPDATE {stock_information_table}
            SET
                company_name = %s, description = %s, history_dev = %s, company_promise  = %s,
                business_risk = %s, key_developments = %s, business_strategies = %s
            WHERE symbol = %s
        """

        try:
            # Iterate over DataFrame rows and execute updates
            for _, row in data.iterrows():
                cursor.execute(UPDATE_QUERY, (row['company_name'], row['company_profile'], row['history_dev']
                                              , row['company_promise'], row['business_risk'], row['key_developments']
                                              , row['business_strategies'], row['stock_id']))

            # Commit the transaction
            conn.commit()
            print(f"Updated {cursor.rowcount} rows successfully.")
        except Exception as e:
            print(f"Error: {e}")
            conn.rollback()
            raise
        finally:
            cursor.close()
            conn.close()

    load_stock_information(extract_and_transform_stock_information())


update_stock_information()