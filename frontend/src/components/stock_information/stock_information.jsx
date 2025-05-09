import { useEffect, useRef, useState } from "react";
import getStockInformation from "../../utils/api/stock_api_utils/GetStockInformation.js";
import { Link, useParams } from "react-router-dom";
import "./stock_information.scss";
import StockHeader from "./StockHeader.jsx";
import StockOverview from "./StockOverview.jsx";
function StockInfor() {
    const PERIOD_ENUM = ["/1-month", "/3-month", "/1-year", "/3-year", ""];
    const KEY_ENUM = ["1M", "3M", "1Y", "3Y", "ALL"];
    const { symbol } = useParams();
    const [stockInformation, setStockInformation] = useState(null);
    const [currPeriod, setCurrPeriod] = useState(0);
    const [activeTab, setActiveTab] = useState("overview");
    const lastData = useRef(0);

    useEffect(() => {
        if (symbol) {
            getStockInformation(symbol).then((response) =>
                setStockInformation(response.data)
            );
        }
    }, [symbol]);
    function handleChangePeriod(index) {
        setCurrPeriod(index);
    }


    return (
        <div className="stock-detail-page">
            {stockInformation && (
                <StockHeader
                    stockInformation={stockInformation}
                    tabs={
                        <>
                            <Link to={`/stocks/${symbol}`} className="tab-link active">
                                Tổng quan
                            </Link>
                            <Link to={`/stocks/${symbol}/financial`} className="tab-link">
                                Số liệu tài chính
                            </Link>
                            <Link to={`/stocks/${symbol}/priceHistory`} className="tab-link">
                                Lịch sử giá
                            </Link>
                        </>
                    }
                />
            )}
            <StockOverview
                stockInformation={stockInformation}
                symbol={symbol}
                currPeriod={currPeriod}
                handleChangePeriod={handleChangePeriod}
                lastData={lastData}
            />
        </div>
    );
}

export default StockInfor;
