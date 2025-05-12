from vnstock3 import Vnstock
import pandas as pd
import datetime
import time

BATCH_SIZE = 30

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
    
    def get_stock_dict(self):
        return self._stock_dict
    
    def get_stock_list(self):
        return self._stocks_by_exchange['symbol'].tolist()

    def get_vn30_stock_list(self):
        return self._vci_source.listing.symbols_by_group('VN30').tolist()

    def get_hose_stock_list(self):
        return self._vci_source.listing.symbols_by_group('HOSE').tolist()

    def get_upcom_stock_list(self):
        return self._vci_source.listing.symbols_by_group('UPCOM').tolist()

    def get_hnx_stock_list(self):
        return self._vci_source.listing.symbols_by_group('HNX').tolist()

    def get_vn100_stock_list(self):
        return self._vci_source.listing.symbols_by_group('VN100').tolist()

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

    def get_company_profile(self, symbol: str, exchange: str) -> pd.DataFrame:
        """
        Đây là hàm để lấy dữ liệu từng mã công ty chứng khoán.

        Args:
            symbol: str (Mã chứng khoán)

        """
        print(f"Đang lấy dữ liệu mã {symbol}")
        company = self._client.stock(symbol=symbol, source='TCBS').company
        data = company.profile()
        data['stock_id'] = symbol
        data['exchange'] = exchange

        return data

    def _companies_profile(self, stock_dict: dict):
        """
        Đây là hàm để hợp nhất dữ liệu các mã chứng khoán.

        Args:
            stocks_list: List (Danh sách các mã chứng khoán)

        Return:
            pandas.DataFrame
        """
        
        total_stocks = len(stock_dict['symbol'])
        
        profiles = [self.get_company_profile(stock_dict['symbol'][i], stock_dict['exchange'][i]) for i in range(total_stocks)]
        return pd.concat(profiles, ignore_index=True)

    def get_all_companies_profile(self) -> pd.DataFrame:
        """
        Đây là hàm để lấy và tổng hợp các dữ liệu từ các mã chứng khoán.

        Return:
            Trả về dữ liệu công ty dưới dạng DataFrame
        """
        time_start = datetime.datetime.now()
        df = self._companies_profile(self._stock_dict)
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
                    df2 = self._companies_profile(retry_stock_dict)
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

        # get_industries_table = ['symbol', 'en_organ_name', 'icb_code1', 'icb_code2', 'icb_code3', 'icb_code4']
        #
        # df2 = df.merge(self._get_stock_by_industries()[get_industries_table],
        #                how='left',
        #                left_on='stock_id',
        #                right_on='symbol')

        time_end = datetime.datetime.now()
        print(f"Tổng thời gian chạy: {(time_end - time_start).total_seconds()}s")
        return df

    # Get stock finance ratio
    def _get_stock_finance_ratio(self, symbol):
        stock = self._client.stock(symbol=symbol, source='TCBS')
        try:
            data = stock.finance.ratio(period='quarter')

            data['symbol'] = symbol

            data['year'] = data['year'].apply(int)
            data.drop_duplicates(subset=['symbol', 'quarter', 'year'], inplace=True)

        except KeyError:
            data = pd.DataFrame()

        return data

    def get_list_of_stock_finance_ratio(self):
        finance_ratio_data = []
        symbol_list = self.get_stock_list()
        for i, symbol in enumerate(symbol_list):
            if (i % BATCH_SIZE == 0 and i != 0):
                print("Sleep 30 seconds")
                time.sleep(30)
            print("Getting finance ratio for", symbol)
            data = self._get_stock_finance_ratio(symbol)
            finance_ratio_data.append(data)

        return pd.concat(finance_ratio_data, ignore_index=True)

    # Get stock finance balance sheet
    def _get_stock_finance_balance_sheet(self, symbol):
        stock = self._client.stock(symbol=symbol, source='TCBS')
        try:
            data = stock.finance.balance_sheet(period='quarter')
            data['symbol'] = symbol
            data['year'] = data['year'].apply(int)
            data['quarter'] = data['quarter'].apply(int)
            data.drop_duplicates(subset=['symbol', 'quarter', 'year'], inplace=True)

        except KeyError:
            data = pd.DataFrame()

        return data

    def get_list_of_stock_finance_balance_sheet(self):
        finance_balance_sheet_data = []
        symbol_list = self.get_stock_list()
        for i, symbol in enumerate(symbol_list):
            if (i % BATCH_SIZE == 0 and i != 0):
                print("Sleep 30 seconds")
                time.sleep(30)
            print("Getting finance balance sheet for", symbol)
            data = self._get_stock_finance_balance_sheet(symbol)
            finance_balance_sheet_data.append(data)

        return pd.concat(finance_balance_sheet_data, ignore_index=True)

    # Get finance cash flow
    def _get_stock_finance_cash_flow(self, symbol):
        stock = self._client.stock(symbol=symbol, source='TCBS')
        try:
            data = stock.finance.cash_flow(period='quarter')
            data['symbol'] = symbol
            data['year'] = data['year'].apply(int)
            data['quarter'] = data['quarter'].apply(int)
            data.drop_duplicates(subset=['symbol', 'quarter', 'year'], inplace=True)
        except KeyError:
            data = pd.DataFrame()
        return data

    def get_list_finance_cash_flow(self):
        finance_cash_flow_data = []
        symbol_list = self.get_stock_list()
        for i, symbol in enumerate(symbol_list):
            if (i % BATCH_SIZE == 0 and i != 0):
                print("Sleep 30 seconds")
                time.sleep(30)
            print("Getting finance cash flow for", symbol)
            data = self._get_stock_finance_cash_flow(symbol)
            finance_cash_flow_data.append(data)

        return pd.concat(finance_cash_flow_data, ignore_index=True)

    # Get finance income statement
    def _get_stock_finance_income_statement(self, symbol):
        stock = self._client.stock(symbol=symbol, source='TCBS')
        try:
            data = stock.finance.income_statement(period='quarter')
            data['symbol'] = symbol
            data['year'] = data['year'].apply(int)
            data['quarter'] = data['quarter'].apply(int)
            data.drop_duplicates(subset=['symbol', 'quarter', 'year'], inplace=True)
        except KeyError:
            data = pd.DataFrame()

        return data

    def get_list_finance_income_statement(self):
        finance_income_statement_data = []
        symbol_list = self.get_stock_list()
        for i, symbol in enumerate(symbol_list):
            if (i % BATCH_SIZE == 0 and i != 0):
                print("Sleep 30 seconds")
                time.sleep(30)

            print("Getting finance income statement for", symbol)
            data = self._get_stock_finance_income_statement(symbol)
            finance_income_statement_data.append(data)

        return pd.concat(finance_income_statement_data, ignore_index=True)

if __name__ == '__main__':
    vnstock = VnStockClient()
    data = vnstock.get_vn30_stock_list()
    print(data)





