from airflow.decorators import dag, task
from pyspark.sql import SparkSession
import pandas as pd
import threading
from ml_models.predict import predict_future

BUCKET = 'investor-ai-bucket'

def read_history_price_from_minio(spark, symbol):
    spark_df = spark.read.format("parquet").load(f"s3a://{BUCKET}/RAW_STOCK_DATA/symbol={symbol}")
    df = spark_df.toPandas()
    df['ticker'] = symbol
    df = df[['ticker', 'trading_date', 'close']]
    df = df.sort_values(by='trading_date', ascending=True)
    df.rename(columns={'trading_date': 'time'}, inplace=True)

    return df

def predict_model(spark, symbol):
    df = read_history_price_from_minio(spark, symbol)

    predicted_df = predict_future(ticker=symbol, df=df, n_days_future=7, sequence_length=3, model_path="./saved_model/model.pth")

    print(predicted_df)

    return predicted_df


@dag(
    dag_id="daily_predict_model",
    schedule=None,
    catchup=False,
    default_args={
        'depends_on_past': False,
        'retries': 0,
    },
)
def daily_predict_model():
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

        predict_model(spark, 'FPT')


    read_history_price()

daily_predict_model()