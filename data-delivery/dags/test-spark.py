import pandas as pd
from pyspark.sql import SparkSession
from airflow.decorators import dag, task
from pyspark.sql.types import *

@dag(
    schedule=None,
    catchup=False,
    tags=["example"],
)
def example_pyspark():
    @task()
    def spark_task():
        spark = SparkSession.builder \
            .appName("test") \
            .master("spark://spark-master:7077") \
            .config("spark.jars.packages", "org.apache.hadoop:hadoop-aws:3.3.4,"
                                         + "com.amazonaws:aws-java-sdk-bundle:1.12.262") \
            .config("spark.hadoop.fs.s3a.endpoint", "http://minio:9000") \
            .config("spark.hadoop.fs.s3a.access.key", "xO9Vm8MljqPj1iN7cgsd") \
            .config("spark.hadoop.fs.s3a.secret.key", "Tmj16j86CPmwYFPpToHIYVPPoizRK1oXWg2AKfdl") \
            .config("spark.hadoop.fs.s3a.path.style.access", "true") \
            .config("fs.s3a.connection.ssl.enabled", "false") \
            .config("spark.hadoop.fs.s3a.impl", "org.apache.hadoop.fs.s3a.S3AFileSystem") \
            .getOrCreate()

        data = [("Alice", 25), ("Bob", 30), ("Charlie", 28)]

        # Định nghĩa schema
        schema = StructType([
            StructField("name", StringType(), True),
            StructField("age", IntegerType(), True)
        ])

        # Tạo DataFrame
        df = spark.createDataFrame(data, schema)

        df.write.mode("overwrite").csv("s3a://test-bucket/test/")


    @task
    def print_df():
        print("Done")

    spark_task()
    print_df()


example_pyspark()


