from airflow.decorators import dag, task, task_group
from airflow.providers.docker.operators.docker import DockerOperator
import pandas as pd
import datetime
import docker
from airflow.operators.bash import BashOperator
from modules.vnstock_client import VnStockClient

@dag(
    dag_id="test",
    schedule=None,
    catchup=False,
    default_args={
        'depends_on_past': False,
        'retries': 0,
    },
)
def test():

    @task
    def task_test():
        vnstock = VnStockClient()
        vn30 = vnstock._get_list_all_stock()
        print(len(vn30))
        print(vn30)

        return vn30

    vn30 = task_test()

test()