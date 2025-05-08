from airflow.decorators import dag, task, task_group
from airflow.providers.docker.operators.docker import DockerOperator
import pandas as pd
import datetime
import docker
from airflow.operators.bash import BashOperator
from modules.vnstock_client import VnStockClient
import math
from datetime import datetime

vnstock = VnStockClient()
CUDA_CONTAINER = 'investor-ai-website-cuda-1'
batch_size = 2

# vn30 = vnstock.get_vn30_stock_list()
# vn100 = [item for item in vnstock.get_vn100_stock_list() if item not in set(vn30)]
# hose = [item for item in vnstock.get_hose_stock_list() if item not in set(vn100)]
# hnx = [item for item in vnstock.get_hnx_stock_list() if item not in set(vn100)]
# upcom = vnstock.get_upcom_stock_list()

vn30 = ['ACB', 'BCM', 'BID', 'BVH', 'CTG', 'FPT', 'GAS', 'GVR', 'HDB', 'HPG', 'LPB', 'MBB', 'MSN', 'MWG', 'PLX', 'SAB', 'SHB', 'SSB', 'SSI', 'STB', 'TCB', 'TPB', 'VCB', 'VHM', 'VIB', 'VIC', 'VJC', 'VNM', 'VPB', 'VRE']

def create_batch_task_group(stock_list, batch_size, parent_group_id):
    @task_group(group_id=parent_group_id)
    def group():
        groups = []
        for i in range(0, len(stock_list), batch_size):
            @task_group(group_id=f"{parent_group_id}_batch_{i}")
            def tg():
                batch_stocks = stock_list[i:i + batch_size]

                exec_task = BashOperator(
                    task_id=f'train_{'_'.join(stock for stock in batch_stocks)}',
                    bash_command=f'docker exec {CUDA_CONTAINER} python3 /Stock_LSTM_Torch/Main_model.py {' '.join(stock for stock in batch_stocks)}'
                )

            groups.append(tg())

        for i in range(len(groups) - 1):
            groups[i] >> groups[i + 1]

    return group

@dag(
    dag_id="train_model_weekly",
    schedule_interval='0 17 * * 5',
    start_date=datetime(2025, 5, 7),
    catchup=False,
    default_args={
        'depends_on_past': False,
        'retries': 0,
    },
)
def train_model_daily():

    vn30_group = create_batch_task_group(stock_list=vn30, batch_size=batch_size, parent_group_id='vn30_group')
    # vn100_group = create_batch_task_group(stock_list=vn100, batch_size=batch_size, parent_group_id='vn100_group')
    # hose_group = create_batch_task_group(stock_list=hose, batch_size=batch_size, parent_group_id='hose_group')
    # hnx_group = create_batch_task_group(stock_list=hnx, batch_size=batch_size, parent_group_id='hnx_group')
    # upcom_group = create_batch_task_group(stock_list=upcom, batch_size=batch_size, parent_group_id='upcom_group')


    vn30_group()
     # >> vn100_group() >> hose_group() >> hnx_group() >> upcom_group()

train_model_daily()