from datetime import datetime
import pandas as pd

# from ssi_client import SSIClient
# from vnstock_client import VnStockClient

SSI_AUTHENTICATION = {
    "ConsumerID": "a394b37ecfcc418eb25b17c7f794f42d",
    "ConsumerSecret": "d552bc0a8bb34d01a953d5521d569c56",
    "PublicKey": "PFJTQUtleVZhbHVlPjxNb2R1bHVzPjgzMjk2ZXNQKzdQMUFmVXdWTW1iRVhvbmNUUXVYdVh2eTJ3dUlwaFMwZEFGNzlnbDI0b21wZTU3OG5wVkVzTGQzMWxpTUpkUUJuN0hWOUp5WW5tQWwvYy9iVktKWTdyMlJnL1E2TVhPMS9hejA4bzZUeEVqTmdaeWJNb0tqb3RCaGkybjBaK3BrU3Q4MFhLdUN0UkMrNkEyZkdtUndiS00xT2tyazVGMDhmaz08L01vZHVsdXM",
    "PrivateKey": "PFJTQUtleVZhbHVlPjxNb2R1bHVzPjgzMjk2ZXNQKzdQMUFmVXdWTW1iRVhvbmNUUXVYdVh2eTJ3dUlwaFMwZEFGNzlnbDI0b21wZTU3OG5wVkVzTGQzMWxpTUpkUUJuN0hWOUp5WW5tQWwvYy9iVktKWTdyMlJnL1E2TVhPMS9hejA4bzZUeEVqTmdaeWJNb0tqb3RCaGkybjBaK3BrU3Q4MFhLdUN0UkMrNkEyZkdtUndiS00xT2tyazVGMDhmaz08L01vZHVsdXM"
}


# def get_company_information() -> pd.DataFrame:
#     print("Bắt đầu lấy dữ liệu thông tin các công ty...")
#     time_start = datetime.now()
#     vnstock = VnStockClient()

#     data = vnstock.get_all_companies_profile()

#     time_end = datetime.now()
#     print(f"Tổng thời gian lấy dữ liệu thông tin các công ty {(time_end - time_start).total_seconds()}s")
#     return data


# def get_all_history_price():
#     print("Bắt đầu lấy dữ liệu lịch sử giá các mã...")
#     time_start = datetime.now()
#     vnstock = VnStockClient()

#     ssi = SSIClient(SSI_AUTHENTICATION)

#     stock_list = vnstock.get_stock_list()[0:1]
#     data = ssi.get_all_history_price(stock_list)

#     data = data.drop(columns=['Time'])

#     time_end = datetime.now()
#     print(f"Tổng thời gian lấy dữ liệu giá {(time_end - time_start).total_seconds()}s")
#     return data


# def get_daily_price(from_date: str = None, to_date: str = None):

#     print("Bắt đầu lấy dữ liệu lịch sử giá hằng ngày...")

#     time_start = datetime.now()
#     ssi = SSIClient(SSI_AUTHENTICATION)
#     data = ssi.get_daily_price(from_date=from_date, to_date=to_date)
#     time_end = datetime.now()

#     print(f"Tổng thời gian lấy dữ liệu giá {(time_end - time_start).total_seconds()}s")

#     return data


# if __name__ == "__main__":
#     data = get_daily_price("30/12/2024", "30/12/2024")
#     print(data.info())
#     print(data.head())
#     print(data['Market'].unique())
    





