from sqlalchemy import create_engine
import pandas as pd

postgres_connection_url = 'postgresql+psycopg2://airflow:airflow@postgres/airflow'

def load_df_to_postgres(table, schema, df):

    engine = create_engine(postgres_connection_url)
    df.to_sql(table, con=engine, if_exists='replace', index=False, schema=schema, chunksize=10000)
    print(f"Successfully load data to {schema}.{table}")

    return