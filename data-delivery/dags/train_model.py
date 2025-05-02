from airflow.decorators import dag, task
from airflow.providers.docker.operators.docker import DockerOperator
import pandas as pd
import threading
import datetime
import docker
from airflow.operators.bash import BashOperator

BUCKET = 'investor-ai-bucket'
CUDA_CONTAINER = 'investor-ai-website-cuda-1'

@dag(
    dag_id="train_model_daily",
    schedule=None,
    catchup=False,
    default_args={
        'depends_on_past': False,
        'retries': 0,
    },
)
def train_model_daily():

    exec_task = BashOperator(
        task_id='exec_in_running_container',
        bash_command=f'docker exec {CUDA_CONTAINER} python3 /Stock_LSTM_Torch/Main_model.py'
    )

train_model_daily()