from airflow.decorators import dag, task
from pyspark.sql import SparkSession
import pandas as pd
import threading
from vnstock3 import Vnstock

BUCKET = 'investor-ai-bucket'

def read_history_price_from_minio(spark, symbol):
    spark_df = spark.read.format("parquet").load(f"s3a://{BUCKET}/RAW_STOCK_DATA/symbol={symbol}")
    df = spark_df.toPandas()

    return df


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
    spark = SparkSession.builder \
        .appName("test") \
        .master("spark://spark-master:7077") \
        .config("spark.jars.packages", "org.apache.hadoop:hadoop-aws:3.3.4,"
                + "com.amazonaws:aws-java-sdk-bundle:1.12.262,"
                + "org.postgresql:postgresql:42.7.5") \
        .config("spark.hadoop.fs.s3a.endpoint", "http://minio:9000") \
        .config("spark.hadoop.fs.s3a.access.key", "TktAgssvy0kF6xoz3zE5") \
        .config("spark.hadoop.fs.s3a.secret.key", "yO6dE1PLYtNRvyhEwGYOSxXrfMxTHO3XNdNF7OZl") \
        .config("spark.hadoop.fs.s3a.path.style.access", "true") \
        .config("fs.s3a.connection.ssl.enabled", "false") \
        .config("spark.hadoop.fs.s3a.impl", "org.apache.hadoop.fs.s3a.S3AFileSystem") \
        .getOrCreate()

    @task
    def read_history_price():
        symbol_list = ['FPT', 'HPG', 'ACB']

        for i in range(3):
            t = threading.Thread(target=read_history_price_from_minio,
                                 args=(spark, symbol_list[i]))
            t.start()
            df = t.join()
            print(type(df))
            print(df)
            print(f'spark task {i} has started')


    read_history_price()

train_model_daily()