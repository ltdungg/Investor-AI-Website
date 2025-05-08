from datetime import timedelta, datetime
import pandas as pd
from airflow.decorators import dag, task
from sqlalchemy import create_engine
from parser import VCBSParser
from analysisAI import generate_analysis_content
from dotenv import dotenv_values
from minio import Minio
from io import BytesIO

config = dotenv_values("/LLM_analysis/.env")
BUCKET = "investor-ai-bucket"
MINIO_ACCESS_KEY="TktAgssvy0kF6xoz3zE5"
MINIO_SECRET_KEY="yO6dE1PLYtNRvyhEwGYOSxXrfMxTHO3XNdNF7OZl"
MINIO_ENDPOINT = "http://minio:9000"
MINIO_STOCK_ANALYSIS = "stock-analysis"
postgres_connection_url = 'postgresql+psycopg2://airflow:airflow@postgres/airflow'
TEMPLATE_PATH = "/LLM_analysis/template.html"

@dag(
    dag_id="LLM_Analysis_Stock",
    schedule_interval=None,
    catchup=False,
    default_args={
        'depends_on_past': False,
        'retries': 0,
    }
)
def llm_analysis():

    @task
    def get_reports_data():
        parser = VCBSParser()

        reports_data = parser.get_reports_data()

        reports_data['body_url'] = MINIO_ENDPOINT + "/" + BUCKET + "/" + MINIO_STOCK_ANALYSIS + "/" + reports_data['id'].astype(str) + f".html"

        reports_data.rename(columns={
            'id': 'id', 'stockSymbol': 'symbol', 'name': 'name', 'source': 'source', 'reportYear': 'report_year',
            'updatedAt': 'published_at'
        }, inplace=True)

        reports_data['published_at'] = reports_data['published_at'].apply(lambda x: datetime.fromisoformat(x.replace('Z', '+00:00')))

        print(reports_data.info())

        return reports_data

    @task
    def load_data_to_postgres(df):

        engine = create_engine(postgres_connection_url)
        df.to_sql('analysis_report', con=engine, if_exists='append', index=False, schema='stock', chunksize=10000)

        print("Success load analysis report to postgresql")

    @task
    def analysis_and_push_to_minio(df):
        parser = VCBSParser()
        minio_client = Minio("minio:9000",
                             access_key=MINIO_ACCESS_KEY,
                             secret_key=MINIO_SECRET_KEY,
                             secure=False)

        ids = df['id'].tolist()

        value = 11916

        numbers = ids.index(value)

        for id in ids[numbers+1:]:
            pdf_content = parser.read_pdf(id)
            destination_file = MINIO_STOCK_ANALYSIS + "/" + f"{id}.html"
            html_content = parser.html_to_text(TEMPLATE_PATH)

            if pdf_content is None:
                continue

            body = generate_analysis_content(pdf_text=pdf_content, html=html_content
                                             ,api_key=config['GEMINI_API'])

            minio_client.put_object(
                bucket_name=BUCKET,
                object_name=destination_file,
                data=BytesIO(body.encode("utf-8")),
                content_type="text/html; charset=utf-8",
                length=len(body.encode("utf-8"))
            )

            print(f"id: {id} successfully uploaded as object",
                    destination_file, "to bucket", BUCKET,)


    df = get_reports_data()

    df >> load_data_to_postgres(df)
    df >> analysis_and_push_to_minio(df)

llm_analysis()


