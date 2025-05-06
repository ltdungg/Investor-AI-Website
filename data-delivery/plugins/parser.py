from bs4 import BeautifulSoup
from PyPDF2 import PdfReader
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService
import time
import json
import pandas as pd
from io import BytesIO

def extract_id_from_name(name):
    parts = name.split(' ')
    if len(parts) > 0:
        return parts[0] if len(parts[0]) == 3 and len(parts) > 0 else (parts[1] if len(parts) > 1 else None)
    return None

class VCBSParser:
    def __init__(self):
        self._analysis_url = f"https://vcbs.com.vn/bao-cao-phan-tich"
        self._reports_url = "https://vcbs.com.vn/api/v1/ttpt-reports?limit=200&page=1&category_code=BCDN&locale=vi"


    def read_pdf(self, id: int):
        chrome_options = Options()
        chrome_options.add_argument("--headless")

        # Set path to Chrome binary
        chrome_options.binary_location = "/opt/chrome/chrome-linux64/chrome"

        # Set path to ChromeDriver
        chrome_service = ChromeService(executable_path="/opt/chromedriver/chromedriver-linux64/chromedriver")

        # Set up driver
        driver = webdriver.Chrome(service=chrome_service, options=chrome_options)
        try:
            url = self._analysis_url + f"/{id}?login=false"
            driver.get(url)

            time.sleep(2)

            final_url = driver.current_url

            driver.quit()

            response = requests.get(final_url)

            pdf_content = BytesIO(response.content)
            try:
                reader = PdfReader(pdf_content)
                text_from_pdf = ""
                for page in reader.pages:
                    text_from_pdf += page.extract_text() + "\n"
            except:
                return None

            return text_from_pdf
        except:

            return None

    def get_reports_data(self):

        response = requests.get(self._reports_url)
        reports_response = json.loads(response.text)
        reports_data_list = reports_response['data']

        df = pd.DataFrame.from_dict(reports_data_list)
        df = df[['id', 'stockSymbol', 'name', 'reportYear', 'updatedAt']]
        df['source'] = 'VCBS'


        mask = (df['id'].isnull()) | (df['id'] == '')

        df.loc[mask, 'id'] = df.loc[mask, 'name'].apply(extract_id_from_name)

        return df

    def html_to_text(self, path):

        try:
            with open(f"{path}", "r", encoding="utf-8") as file:
                html_content = file.read()
        except FileNotFoundError:
            print("Không tìm thấy file HTML.")
            exit()

        soup = BeautifulSoup(html_content, 'html.parser')

        return soup







