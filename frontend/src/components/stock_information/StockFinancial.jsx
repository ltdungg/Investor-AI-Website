import { useParams, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import getStockInformation from "../../utils/api/stock_api_utils/GetStockInformation.js";
import StockHeader from "./StockHeader.jsx";
import getFinanceRatio from "../../utils/api/stock_api_utils/GetFinanceRatio.js";
function StockFinancial() {
    const { symbol } = useParams();
    const [stockInformation, setStockInformation] = useState(null);
    const [financeRatio, setFinanceRatio] = useState(null);

    useEffect(() => {
        if (symbol) {
            getStockInformation(symbol).then((response) =>
                setStockInformation(response.data)
            );
            getFinanceRatio(symbol).then((response) => {
                const data = response.data;
                if (data && data.length > 0) {
                    let latestData = data[0];
                    for (let i = 1; i < data.length; i++) {
                        if (
                            data[i].year > latestData.year ||
                            (data[i].year === latestData.year &&
                                data[i].quarter > latestData.quarter)
                        ) {
                            latestData = data[i];
                        }
                    }
                    setFinanceRatio(latestData);
                }
            });
        }
    }, [symbol]);

    const formatPrice = (price) => {
      return price !== null && price !== undefined
          ? parseFloat(price)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "N/A";
  };
    return (
        <div className="stock-detail-page">
            {stockInformation && (
                <StockHeader
                    stockInformation={stockInformation}
                    financeRatio={financeRatio}
                    tabs={
                      <>
                          <Link to={`/stocks/${symbol}`} className="tab-link">
                              Tổng quan
                          </Link>
                          <Link to={`/stocks/${symbol}/financial`} className="tab-link active">
                              Số liệu tài chính
                          </Link>
                          <Link to={`/stocks/${symbol}/priceHistory`} className="tab-link">
                              Lịch sử giá
                          </Link>
                      </>
                  }
                />
            )}
            <div className="financial-data-section">
                <h3>Số liệu tài chính</h3>
            </div>
        </div>
    );
}

export default StockFinancial;
