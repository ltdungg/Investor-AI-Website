ALTER TABLE stock.stock_information
ADD COLUMN "group" VARCHAR(10);

UPDATE stock.stock_information
SET "group" = CASE
    WHEN symbol IN ('ACB', 'BCM', 'BID', 'BVH', 'CTG', 'FPT', 'GAS', 'GVR', 'HDB', 'HPG',
                    'LPB', 'MBB', 'MSN', 'MWG', 'PLX', 'SAB', 'SHB', 'SSB', 'SSI', 'STB',
                    'TCB', 'TPB', 'VCB', 'VHM', 'VIB', 'VIC', 'VJC', 'VNM', 'VPB', 'VRE') THEN 'VN30'
    WHEN symbol IN ('AAA', 'ANV', 'BCG', 'BMP', 'BSI', 'BWE', 'CII', 'CMG', 'CTD', 'CTR',
                    'CTS', 'DBC', 'DCM', 'DGC', 'DGW', 'DIG', 'DPM', 'DSE', 'DXG', 'DXS',
                    'EIB', 'EVF', 'FRT', 'FTS', 'GEX', 'GMD', 'HAG', 'HCM', 'HDC', 'HDG',
                    'HHV', 'HSG', 'HT1', 'IMP', 'KBC', 'KDC', 'KDH', 'KOS', 'MSB', 'NAB',
                    'NKG', 'NLG', 'NT2', 'OCB', 'PAN', 'PC1', 'PDR', 'PHR', 'PNJ', 'POW',
                    'PPC', 'PTB', 'PVD', 'PVT', 'REE', 'SBT', 'SCS', 'SIP', 'SJS', 'SZC',
                    'TCH', 'TLG', 'VCG', 'VCI', 'VGC', 'VHC', 'VIX', 'VND', 'VPI', 'VTP') THEN 'VN100'
    ELSE NULL
END;
