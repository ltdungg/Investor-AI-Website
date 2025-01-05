from vnstock3 import Vnstock
import pandas as pd
import asyncio
import datetime
import time


class VnStockClient:
    def __init__(self):
        self._client = Vnstock()
        self._vci_source = self._client.stock(source='VCI')
        self._symbols_by_exchange = self._get_list_all_stock()
        self._stocks_by_exchange = self._symbols_by_exchange[self._symbols_by_exchange['type'] == 'STOCK'][~(self._symbols_by_exchange['exchange'] == 'DELISTED')]

        self._stocks_by_exchange['exchange'] = self._stocks_by_exchange['exchange'].apply(lambda x: "HOSE" if x == 'HSX' else x)

        self._stock_dict = {
            'symbol': self._stocks_by_exchange['symbol'].tolist(),
            'exchange': self._stocks_by_exchange['exchange'].tolist()
        }

    def get_industries_icb(self):
        return self._vci_source.listing.industries_icb()
    
    def get_stock_list(self):
        return self._stocks_by_exchange['symbol'].tolist()

    def _get_stock_by_industries(self):
        """
            Lấy dữ liệu các mã chứng khoán theo mã ngành icb
        """
        return self._vci_source.listing.symbols_by_industries()

    def _get_list_all_stock(self):
        """
        Liệt kê mã CP theo sà
        Bao gồm loại mã (cổ phiếu, trái phiếu,...)
        Bao gồm các loại sàn (HOSE, HNX, UPCOM,...)
        """
        return self._vci_source.listing.symbols_by_exchange()

    # Hàm lấy dữ liệu các công ty chứng khoán.

    async def get_company_profile(self, symbol: str, exchange: str) -> pd.DataFrame:
        """
        Đây là hàm để lấy dữ liệu từng mã công ty chứng khoán.

        Args:
            symbol: str (Mã chứng khoán)

        """
        print(f"Đang lấy dữ liệu mã {symbol}")
        company = self._client.stock(symbol=symbol, source='TCBS').company
        loop = asyncio.get_running_loop()
        data = await loop.run_in_executor(None, company.profile)
        data['stock_id'] = symbol
        data['exchange'] = exchange

        return data

    async def _companies_profile(self, stock_dict: dict):
        """
        Đây là hàm để hợp nhất dữ liệu các mã chứng khoán.

        Args:
            stocks_list: List (Danh sách các mã chứng khoán)

        Return:
            pandas.DataFrame
        """
        
        total_stocks = len(stock_dict['symbol'])
        
        tasks = [self.get_company_profile(stock_dict['symbol'][i], stock_dict['exchange'][i]) for i in range(total_stocks)]
        profiles = await asyncio.gather(*tasks)
        return pd.concat(profiles, ignore_index=True)

    def get_all_companies_profile(self) -> pd.DataFrame:
        """
        Đây là hàm để lấy và tổng hợp các dữ liệu từ các mã chứng khoán.

        Return:
            Trả về dữ liệu công ty dưới dạng DataFrame
        """
        time_start = datetime.datetime.now()

        df = asyncio.run(self._companies_profile(self._stock_dict))
        while True:
            try:
                if (df['message'] == "API rate limit exceeded").any():
                    print("Đang chạy lại")
                    time.sleep(120)
                    retry_stock_list = df['stock_id'][df['message'] == "API rate limit exceeded"].tolist()
                    retry_stock_exchange = df['exchange'][df['message'] == "API rate limit exceeded"].tolist()
                    
                    retry_stock_dict = {
                        'symbol': retry_stock_list,
                        'exchange': retry_stock_exchange
                    }
                    
                    df['message'] = df['message'].fillna("Success")
                    df = df[~(df['message'] == "API rate limit exceeded")]
                    df2 = asyncio.run(self._companies_profile(retry_stock_dict))
                    df = pd.concat([df2, df], ignore_index=True)
                else:
                    break
            except KeyError:
                break

        drop_column_list = ['status', 'code', 'message', 'trace_id', 'ticker']
        for column in drop_column_list:
            try:
                df = df.drop(columns=[column])
            except KeyError:
                continue

        get_industries_table = ['symbol', 'en_organ_name', 'icb_code1', 'icb_code2', 'icb_code3', 'icb_code4']

        df2 = df.merge(self._get_stock_by_industries()[get_industries_table],
                       how='left',
                       left_on='stock_id',
                       right_on='symbol')

        time_end = datetime.datetime.now()
        print(f"Tổng thời gian chạy: {(time_end - time_start).total_seconds()}s")
        return df2
    





