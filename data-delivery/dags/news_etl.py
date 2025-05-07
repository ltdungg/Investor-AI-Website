from datetime import timedelta, datetime
import pandas as pd
from airflow.decorators import dag, task
from sqlalchemy import create_engine
from seleniumwire import webdriver
import time
from selenium.webdriver.chrome.options import Options
import requests
import json

postgres_connection_url = 'postgresql+psycopg2://airflow:airflow@postgres/airflow'
NEWS_API = "https://w-api.baomoi.com/api/v1/content/get/list-by-type"
STOCK_NEWS_URL = "https://baomoi.com/t8687517"
news_table = 'news'

NUMBERS_OF_PAGES = 10

@dag(
    dag_id="news_etl",
    schedule=None,
    catchup=False,
    default_args={
        'depends_on_past': False,
        'retries': 0,
    }
)
def news_etl():
    @task
    def get_api_url():
        options = {
            'disable_encoding': True  # để dễ đọc response body
        }

        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-setuid-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument("--start-maximized")
        chrome_options.add_argument("--window-size=1920,1080")

        driver = webdriver.Chrome(seleniumwire_options=options, options=chrome_options)

        url_list = []

        for i in range(1, NUMBERS_OF_PAGES):

            driver.get(STOCK_NEWS_URL + f"/trang{i}.epi")

            time.sleep(3)

            for request in driver.requests:
                if request.response:
                    url = request.url
                    if "api" in url or "ajax" in url:
                        if NEWS_API in url and request.response.status_code == 200 and request.method == 'GET':
                            url_list.append(url)

            time.sleep(2)

        driver.quit()

        return url_list

    @task
    def extract_news(url_list):
        news_data_list = []

        for url in url_list:
            response = requests.get(url)
            response_json = json.loads(response.text)

            news_data = response_json['data']['items']
            news_data_list.append(news_data)

        return news_data_list

    @task
    def transform_news_data(news_data_list):

        news_dfs = []

        for news_data in news_data_list:
            news = {
                'id': [news_data[i]['id'] for i in range(len(news_data))],
                'title': [news_data[i]['title'] for i in range(len(news_data))],
                'date': [datetime.fromtimestamp(news_data[i]['date']) for i in range(len(news_data))],
                'redirect_url': [news_data[i]['redirectUrl'] for i in range(len(news_data))],
                'thumb': [news_data[i]['thumb'] for i in range(len(news_data))],
                'publisher': [news_data[i]['publisher']['name'] for i in range(len(news_data))],
                'description': [news_data[i]['description'] for i in range(len(news_data))]
            }

            news_df = pd.DataFrame.from_dict(news)

            news_df['redirect_url'] = "https://baomoi.com" + news_df['redirect_url']

            news_dfs.append(news_df)

        return pd.concat(news_dfs, ignore_index=True)

    @task
    def load_news_data(news_df):
        engine = create_engine(postgres_connection_url)
        news_df.to_sql(news_table, con=engine, if_exists='append', index=False, schema='stock', chunksize=10000)

    url_list = get_api_url()
    news_data_list = extract_news(url_list)
    transformed_news_data = transform_news_data(news_data_list)

    url_list >> news_data_list >> transformed_news_data >> load_news_data(transformed_news_data)

news_etl()


