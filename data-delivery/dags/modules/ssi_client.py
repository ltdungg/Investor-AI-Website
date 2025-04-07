import requests
from requests.adapters import HTTPAdapter
from datetime import datetime
import math
import time
import pandas as pd


class SSIClient:
    """
    A client to interact with the SSI API for retrieving stock market data.
    
    Attributes:
        _url (str): Base URL for the SSI API.
        _consumer_id (str): Consumer ID for authentication.
        _consumer_secret (str): Consumer secret for authentication.
        _access_token (str): Access token for API requests.
        _header (dict): Header for API requests.
    """
    def __init__(self, authentication: dict):
        """
        Initialize the SSIClient with authentication details.
        
        Args:
            authentication (dict): A dictionary containing 'ConsumerID' and 'ConsumerSecret'.
        """
        self._url = 'https://fc-data.ssi.com.vn/api/v2/'
        self._consumer_id = authentication['ConsumerID']
        self._consumer_secret = authentication['ConsumerSecret']
        self._access_token = self._get_access_token()
        self._header = {
            'Authorization': f'Bearer {self._access_token}'
        }

    def _get_access_token(self):
        """
        Retrieve the access token using the consumer ID and secret.
        
        Returns:
            str: Access token.
        
        Raises:
            Exception: If authentication fails.
        """
        url = self._url + '/Market/AccessToken'
        body = {
            'consumerID': self._consumer_id,
            'consumerSecret': self._consumer_secret
        }
        response = requests.post(url, data=body)
        if response.status_code == 200:
            data = response.json()
            access_token = data['data']['accessToken']

            return access_token

        else:
            raise Exception(f"Trạng thái {response.status_code}, Không xác thực người dùng thành công!")

    def _get_daily_price(self,
                         symbol: str = None,
                         fromDate: str = None,
                         toDate: str = None,
                         pageIndex: int = 1,
                         pageSize: int = 10,
                         ascending: bool = True):
        """
        Retrieve daily price data for a given symbol within a date range.
        
        Args:
            symbol (str): Stock symbol.
            fromDate (str): Start date in 'dd/mm/yyyy' format.
            toDate (str): End date in 'dd/mm/yyyy' format.
            pageIndex (int): Page index for pagination.
            pageSize (int): Number of records per page.
            ascending (bool): Sort order.
        
        Returns:
            dict: JSON response containing daily price data.
        
        Raises:
            Exception: If data retrieval fails.
        """
        url = self._url + '/Market/DailyOhlc'

        params = {
            'Symbol': symbol,
            'FromDate': fromDate,
            'ToDate': toDate,
            'PageIndex': pageIndex,
            'PageSize': pageSize,
            'ascending': ascending
        }
        response = requests.get(url=url,
                            headers=self._header,
                            params=params)
        if response.status_code == 200:
            return response.json()             

        raise Exception("Không trích xuất dữ liệu thành công")

    def _get_all_history_price_of_one_symbol(self, symbol: str):
        """
        Retrieve all historical price data for a given symbol.
        
        Args:
            symbol (str): Stock symbol.
        
        Returns:
            list: List of historical price data.
        """
        time_start = datetime.now()
        print(f"Đang lấy tất cả lịch sử giá của mã {symbol}")
        from_date = '01/01/2000'
        to_date = datetime.now().strftime('%d/%m/%Y')
        response = self._get_daily_price(symbol=symbol,
                                         fromDate=from_date,
                                         toDate=to_date,
                                         pageIndex=1,
                                         pageSize=1000
                                         )
        data = response['data']
        
        total_records = int(response['totalRecord'])
        total_page_index = math.ceil(total_records / 1000)

        for i in range(2, total_page_index + 1):
            time.sleep(1)
            request = self._get_daily_price(symbol=symbol,
                                            fromDate=from_date,
                                            toDate=to_date,
                                            pageIndex=i,
                                            pageSize=1000
                                            )
            try:
                result = request['data']
            except KeyError:
                continue
            for res in result:
                data.append(res)

        time_end = datetime.now()
        print(f"Tổng thời gian lấy dữ liệu mã {symbol} là: {(time_end - time_start).total_seconds()}s")
        return data

    def get_all_history_price(self, stock_dict: dict):
        """
        Retrieve historical price data for multiple symbols.
        
        Args:
            stock_dict (dict): Dictionary containing 'symbol' and 'exchange' lists.
        
        Returns:
            pd.DataFrame: DataFrame containing historical price data for all symbols.
        """
        print("Đang lấy dữ liệu lịch sử giá...")

        total_stocks = len(stock_dict['symbol'])
        
        stock_price_history = []
        for i in range(total_stocks):
            symbol_price_history = self._get_all_history_price_of_one_symbol(stock_dict['symbol'][i])
            df = pd.DataFrame.from_dict(symbol_price_history)
            df['Exchange'] = stock_dict['exchange'][i]
            stock_price_history.append(df)

        return pd.concat(stock_price_history, ignore_index=True)

    def get_daily_price(self, from_date: str = None, to_date: str = None):
        """
        Retrieve daily price data within a date range.
        
        Args:
            from_date (str): Start date in 'dd/mm/yyyy' format.
            to_date (str): End date in 'dd/mm/yyyy' format.
        
        Returns:
            pd.DataFrame: DataFrame containing daily price data.
        """
        daily_data = self._get_daily_price(
            fromDate=from_date,
            toDate=to_date,
            pageIndex=1,
            pageSize=1000
        )
        try:
            data = daily_data['data']
            total_records = int(daily_data['totalRecord'])
            total_index = math.ceil(total_records / 1000)
        except KeyError:
            return pd.DataFrame()
        else:
            for i in range(2, total_index + 1):
                time.sleep(1)
                daily_data = self._get_daily_price(
                    fromDate=from_date,
                    toDate=to_date,
                    pageIndex=i,
                    pageSize=1000
                )
                try:
                    for result in daily_data['data']:
                        data.append(result)
                except KeyError:
                    break

        return pd.DataFrame.from_dict(data)


if __name__ == '__main__':
    client = SSIClient()
