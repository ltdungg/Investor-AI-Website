from airflow.decorators import dag, task, task_group
import pandas as pd
from airflow.operators.bash import BashOperator
from modules.vnstock_client import VnStockClient
from datetime import datetime

CUDA_CONTAINER = 'investor-ai-website-cuda-1'
batch_size = 10
# vnstock = VnStockClient()
# vn30 = vnstock.get_vn30_stock_list()
# vn100 = [item for item in vnstock.get_vn100_stock_list() if item not in set(vn30)]
# hose = [item for item in vnstock.get_hose_stock_list() if item not in set(vn100)]
# hnx = [item for item in vnstock.get_hnx_stock_list() if item not in set(vn100)]
# upcom = vnstock.get_upcom_stock_list()


def create_batch_task_group(stock_list, batch_size, parent_group_id):
    @task_group(group_id=parent_group_id)
    def group():
        groups = []
        for i in range(0, len(stock_list), batch_size):
            @task_group(group_id=f"{parent_group_id}_batch_{i}")
            def tg():
                batch_stocks = stock_list[i:i + batch_size]

                exec_task = BashOperator(
                    task_id=f'predict_{'_'.join(stock for stock in batch_stocks)}',
                    bash_command=f'docker exec {CUDA_CONTAINER} python3 /Stock_LSTM_Torch/predict.py {' '.join(stock for stock in batch_stocks)}'
                )

            groups.append(tg())

        for i in range(len(groups) - 1):
            groups[i] >> groups[i + 1]

    return group

@dag(
    dag_id="daily_predict_model",
    schedule_interval='0 17 * * 0',
    start_date=datetime(2025, 5, 7),
    catchup=False,
    default_args={
        'depends_on_past': False,
        'retries': 0,
    },
)
def daily_predict_model():

    exec_task = BashOperator(
        task_id=f'predict',
        bash_command=f'docker exec {CUDA_CONTAINER} python3 /Stock_LSTM_Torch/predict.py'
    )


daily_predict_model()