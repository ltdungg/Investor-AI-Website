import React, { useState } from "react";
import { useParams } from "react-router-dom";
import getFinanceRatio from "../../utils/api/stock_api_utils/GetFinanceRatio";
import getStockPrice from "../../utils/api/stock_api_utils/GetStockPrice";
import { useEffect } from "react";

function StockHeader({ stockInformation, tabs }) {
    const { symbol } = useParams();
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [newestStockPrice, setNewestStockPrice] = useState([{}]);
    const [secondNewestStockPrice, setSecondNewestStockPrice] = useState([{}]);

    const [financeRatio, setFinanceRatio] = useState(null);

    useEffect(() => {
        if (symbol) {
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
            getStockPrice(symbol).then((response) => {
                const prices = response.data;

                if (prices && prices.length > 0) {
                    const sortedPrices = prices.sort(
                        (a, b) =>
                            new Date(b.tradingDate) - new Date(a.tradingDate)
                    );

                    setNewestStockPrice(sortedPrices[0]);
                    setSecondNewestStockPrice(sortedPrices[1]);
                }
            });
        }
    }, [symbol]);

    const formatDecimal = (value) => {
        return value !== null && value !== undefined
            ? parseFloat(value)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : "N/A";
    };
    const formatInteger = (value) => {
        return value !== null && value !== undefined
            ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : "N/A";
    };
    const formatPercentage = (value) => {
        return value !== null && value !== undefined
            ? `${(value * 100).toFixed(2)}%`
            : "N/A";
    };
    const formatCurrency = (value) => {
        return value !== null && value !== undefined
            ? `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
            : "N/A";
    };

    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    return (
        <>
            <div className="stock-header">
                <div className="stock-header-left">
                    <h1 className="stock-code">
                        {stockInformation.symbol || symbol}
                    </h1>
                    <h2 className="stock-name">
                        {stockInformation.companyName}
                    </h2>
                    <div className="stock-intro-box">
                        <div className="stock-intro-icon">
                            <svg
                                width="36"
                                height="36"
                                fill="var(--primary-blue)"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                            </svg>
                        </div>
                        <div className="stock-intro-content">
                            <div className="stock-intro-row">
                                <span className="stock-intro-label">
                                    Ngành nghề:
                                </span>
                                <span className="stock-intro-value">
                                    {stockInformation.icb1 || "N/A"}
                                </span>
                            </div>
                            <div className="stock-intro-row">
                                <span className="stock-intro-label">
                                    Sàn giao dịch:
                                </span>
                                <span className="stock-intro-value">
                                    {stockInformation.exchange || "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`stock-description ${
                            isDescriptionExpanded ? "expanded" : ""
                        }`}
                    >
                        <p>
                            {stockInformation.description || "Chưa có mô tả."}
                        </p>
                    </div>
                    <button
                        className="read-more-btn"
                        onClick={toggleDescription}
                    >
                        {isDescriptionExpanded ? "Thu gọn" : "Xem thêm..."}
                    </button>
                </div>
                <div className="stock-header-right">
                    <div className="price-container">
                        <div className="price-group">
                            <span className="stock-price">
                                {formatDecimal(newestStockPrice.close)|| "N/A"}
                            </span>
                            <span
                                className={`stock-price-change ${
                                    formatDecimal((newestStockPrice.close-secondNewestStockPrice.close)/secondNewestStockPrice.close*100) >= 0
                                        ? "positive"
                                        : "negative"
                                }`}
                            >
                                {(newestStockPrice.close-secondNewestStockPrice.close) >= 0 ? "+" : ""}
                                {(newestStockPrice.close-secondNewestStockPrice.close) || "N/A"} (
                                {formatDecimal((newestStockPrice.close-secondNewestStockPrice.close)/secondNewestStockPrice.close*100)}%)
                            </span>
                        </div>
                    </div>
                    <div className="financial-metrics-grid">
                        <>
                            <div className="metric-card">
                                <div className="metric-label">P/E</div>
                                <div className="metric-value">
                                    {formatDecimal(
                                        financeRatio?.priceToEarning
                                    ) || "N/A"}
                                </div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-label">P/B</div>
                                <div className="metric-value">
                                    {formatDecimal(financeRatio?.priceToBook) ||
                                        "N/A"}
                                </div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-label">ROE</div>
                                <div className="metric-value">
                                    {formatPercentage(financeRatio?.roe) ||
                                        "N/A"}
                                </div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-label">EPS</div>
                                <div className="metric-value">
                                    {formatInteger(
                                        financeRatio?.earningPerShare
                                    ) || "N/A"}
                                </div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-label">EV/EBITDA</div>
                                <div className="metric-value">
                                    {formatDecimal(
                                        financeRatio?.valueBeforeEbitda
                                    ) || "N/A"}
                                </div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-label">ROA</div>
                                <div className="metric-value">
                                    {formatDecimal(financeRatio?.roa) || "N/A"}
                                </div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-label">D/E</div>
                                <div className="metric-value">
                                    {formatDecimal(
                                        financeRatio?.debtOnEquity
                                    ) || "N/A"}
                                </div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-label">
                                    Current Ratio
                                </div>
                                <div className="metric-value">
                                    {formatDecimal(
                                        financeRatio?.currentPayment
                                    ) || "N/A"}
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </div>
            {tabs && <div className="tabs-container">{tabs}</div>}
        </>
    );
}

export default StockHeader;
