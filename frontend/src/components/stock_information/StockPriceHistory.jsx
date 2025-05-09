import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getStockInformation from "../../utils/api/stock_api_utils/GetStockInformation.js";
import getStockPrice from "../../utils/api/stock_api_utils/GetStockPrice.js";
import StockHeader from "./StockHeader.jsx";
import "./StockPriceHistory.scss"
import Loading from "../loading/loading.jsx";

function StockPriceHistory() {
    const { symbol } = useParams();
    const [stockInformation, setStockInformation] = useState(null);
    const [stockPrice, setStockPrice] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (symbol) {
            getStockInformation(symbol).then((response) =>
                setStockInformation(response.data)
            );
            getStockPrice(symbol).then((response) => {
                const sortedPrices = response.data.sort((a, b) => 
                    new Date(b.tradingDate) - new Date(a.tradingDate)
                );
                setStockPrice(sortedPrices);
                setLoading(false);
            });
        }
    }, [symbol]);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(dateString).toLocaleDateString("vi-VN", options);
    };

    const formatNumber = (number) => {
        return number.toLocaleString("vi-VN");
    };

    const formatCurrency = (number) => {
        return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    };

    return (
        <div className="stock-detail-page">
            {stockInformation && (
                <StockHeader
                    stockInformation={stockInformation}
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
                <h3>Lịch sử giá</h3>
                <table className="price-history-table">
                    <thead>
                        <tr>
                            <th>Ngày giao dịch</th>
                            <th>Sàn giao dịch</th>
                            <th>Giá mở cửa</th>
                            <th>Giá cao nhất</th>
                            <th>Giá thấp nhất</th>
                            <th>Giá đóng cửa</th>
                            <th>Khối lượng</th>
                            <th>Giá trị</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockPrice.map((price, index) => (
                            <tr key={index}>
                                <td>{formatDate(price.tradingDate)}</td>
                                <td>{price.exchange}</td>
                                <td>{formatCurrency(price.open)}</td>
                                <td>{formatCurrency(price.high)}</td>
                                <td>{formatCurrency(price.low)}</td>
                                <td>{formatCurrency(price.close)}</td>
                                <td>{formatNumber(price.volume)}</td>
                                <td>{formatCurrency(price.value)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {loading && <Loading />}
        </div>
    );
}

export default StockPriceHistory;