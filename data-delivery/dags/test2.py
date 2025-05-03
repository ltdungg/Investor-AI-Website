from vnstock import Vnstock
import pandas as pd

vnstock = Vnstock().stock(symbol='SSI', source='VCI')

print(vnstock.listing.symbols_by_group('VN30').tolist())