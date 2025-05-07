import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getStockInformation from "../../utils/api/stock_api_utils/GetStockInformation.js";
import StockHeader from "./StockHeader.jsx";
import getFinanceRatio from "../../utils/api/stock_api_utils/GetFinanceRatio.js";
function StockPriceHistory() {
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
        return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "N/A";
    };
    return (
        <div className="stock-detail-page">
            {stockInformation && (
                <StockHeader
                    stockInformation={stockInformation}
                    financeRatio={financeRatio}
                    formatPrice={formatPrice}
                    tabs={
                        <>
                            <Link
                                to={`/stocks/${symbol}`}
                                className="tab-link"
                            >
                                Tổng quan
                            </Link>
                            <Link
                                to={`/stocks/${symbol}/financial`}
                                className="tab-link"
                            >
                                Số liệu tài chính
                            </Link>
                            <Link
                                to={`/stocks/${symbol}/priceHistory`}
                                className="tab-link active"
                            >
                                Lịch sử giá
                            </Link>
                        </>
                    }
                />
            )}
            <div className="price-history-section">
                <h3>Lịch sử giá & Cổ tức</h3>
            </div>
        </div>
    );
}

export default StockPriceHistory;
