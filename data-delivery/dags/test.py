from airflow.decorators import dag, task
from modules.vnstock_client import VnStockClient
import pandas as pd
from datetime import datetime, timedelta

default_args = {
    'owner': 'InvestorAI',
    'start_date': datetime(2025, 2, 21)
}

@dag(
    dag_id='test',
    default_args=default_args,
    description='Get all finance balance sheet data',
    catchup=False,
    schedule_interval=None
)
def test(**kwargs):
    @task
    def test_task():
        vnstock = VnStockClient()
        vn30 = vnstock._get_stock_finance_ratio('ACB')
        print(vn30['value_before_ebitda'])
        print(vn30)

    test_task()
test()