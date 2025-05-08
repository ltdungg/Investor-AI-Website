from datetime import timedelta,datetime
import pandas as pd
from pyspark.sql import SparkSession
from airflow.decorators import dag, task
from pyspark.sql.types import *
from airflow.providers.postgres.hooks.postgres import PostgresHook

BUCKET = "investor-ai-bucket"

@dag(
    dag_id="load_postgres_data_to_minio",
    schedule_interval='0 17 * * *',
    start_date=datetime(2025, 5, 7),
    catchup=False,
    default_args={
        'depends_on_past': False,
        'retries': 0,
    }
)
def load_postgres_data_to_minio():
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
    
    @task()
    def read_and_load_to_minio():
        postgres_url = "jdbc:postgresql://postgres:5432/airflow"
        postgres_properties = {
            "user": "airflow",
            "password": "airflow",
            "driver": "org.postgresql.Driver"
        }
        df = spark.read.jdbc(url=postgres_url, table="stock.stock_price", properties=postgres_properties)

        df.write \
            .partitionBy("symbol") \
            .mode("overwrite") \
            .parquet("s3a://{}/RAW_STOCK_DATA".format(BUCKET))
        return "Success writing to MinIO"


    @task
    def success():
        print("Done")

    read_and_load_to_minio()
    success()

load_postgres_data_to_minio()


