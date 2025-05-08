import { useEffect, useRef, useState } from "react";
import StockPriceGraphByPeriod from "./RenderDatas/RenderStockPriceGraphByPeriod.jsx";
import RenderStockPredict from "./RenderDatas/RenderStockPredict.jsx";
import getStockInformation from "../../utils/api/stock_api_utils/GetStockInformation.js";
import { Link, useParams } from "react-router-dom";
import "./stock_information.scss";
import getFinanceRatio from "../../utils/api/stock_api_utils/GetFinanceRatio.js";
import StockHeader from "./StockHeader.jsx";
import StockOverview from "./StockOverview.jsx";
import getStockPrice from "../../utils/api/stock_api_utils/GetStockPrice.js";

function StockInfor() {
    const PERIOD_ENUM = ["/1-month", "/3-month", "/1-year", "/3-year", "/all"];
    const KEY_ENUM = ["1M", "3M", "1Y", "3Y", "ALL"];
    const { symbol } = useParams();
    const [stockInformation, setStockInformation] = useState(null);
    const [currPeriod, setCurrPeriod] = useState(0);
    const [activeTab, setActiveTab] = useState("overview");
    const lastData = useRef(0);
    const [financeRatio, setFinanceRatio] = useState(null);
    const [stockPrice, setStockPrice] = useState([{}]);
    const [newStockPrice, setStockPrice] = useState([{}]);

    

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
            getStockPrice(symbol).then((response) =>
                setStockPrice(response.data)
            )
        }
    }, [symbol]);

    function handleChangePeriod(index) {
        setCurrPeriod(index);
    }
    // const renderTabContent = () => {
    //     switch (activeTab) {
    //         case "overview":
    //             return (
    //                 <>
    //                     <div className="chart-section">
    //                         <h3>Biểu đồ giá</h3>
    //                         <div className="chart-period-selector">
    //                             {PERIOD_ENUM.map((_, index) => (
    //                                 <button
    //                                     key={index}
    //                                     className={
    //                                         currPeriod === index ? "active" : ""
    //                                     }
    //                                     onClick={() =>
    //                                         handleChangePeriod(index)
    //                                     }
    //                                 >
    //                                     {KEY_ENUM[index]}
    //                                 </button>
    //                             ))}
    //                         </div>
    //                         {symbol && (
    //                             <StockPriceGraphByPeriod
    //                                 symbol={symbol}
    //                                 endpoint={PERIOD_ENUM[currPeriod]}
    //                                 lastData={lastData}
    //                             />
    //                         )}
    //                     </div>
    //                     <div className="stock-predict">
    //                         <RenderStockPredict
    //                             symbol={symbol}
    //                             lastData={lastData.current}
    //                         />
    //                     </div>
    //                     {stockInformation && (
    //                         <div className="company-info-section">
    //                             <div className="company-info-box">
    //                                 <h4>Lịch sử phát triển</h4>
    //                                 <p>
    //                                     {stockInformation.historyDev ||
    //                                         "Chưa có thông tin lịch sử."}
    //                                 </p>
    //                             </div>
    //                             <div className="company-info-box">
    //                                 <h4>Chiến lược kinh doanh</h4>
    //                                 <p>
    //                                     {stockInformation.businessStrategies ||
    //                                         "Chưa có thông tin chiến lược."}
    //                                 </p>
    //                                 {/* <ul>
    //                 {(stockInformation.businessStrategies  || []).map((strategy, index) => (
    //                   <li key={index}>{strategy}</li>
    //                 ))}
    //               </ul> */}
    //                             </div>
    //                             <div className="company-info-box">
    //                                 <h4>Rủi ro kinh doanh</h4>
    //                                 <p>
    //                                     {stockInformation.businessRisk ||
    //                                         "Chưa có thông tin rủi ro."}
    //                                 </p>
    //                             </div>
    //                             <div className="company-info-box">
    //                                 <h4>Các sự kiện phát triển</h4>
    //                                 <p>
    //                                     {stockInformation.keyDevelopments ||
    //                                         "Chưa có thông tin sự kiện."}
    //                                 </p>
    //                             </div>
    //                         </div>
    //                     )}
    //                 </>
    //             );
    //         case "financial":
    //             return (
    //                 <div className="financial-data-section">
    //                     <h3>Số liệu tài chính</h3>
    //                     {financeRatio && (
    //                         <table className="financial-table">
    //                             <tbody>
    //                                 <tr>
    //                                     <td>P/E</td>
    //                                     <td>
    //                                         {financeRatio.priceToEarning ||
    //                                             "N/A"}
    //                                     </td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td>P/B</td>
    //                                     <td>
    //                                         {financeRatio.priceToBook || "N/A"}
    //                                     </td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td>ROE</td>
    //                                     <td>{financeRatio.roe || "N/A"}</td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td>ROA</td>
    //                                     <td>{financeRatio.roa || "N/A"}</td>
    //                                 </tr>
    //                             </tbody>
    //                         </table>
    //                     )}
    //                 </div>
    //             );
    //         case "priceHistory":
    //             return (
    //                 <div className="price-history-section">
    //                     <h3>Lịch sử giá & Cổ tức</h3>
    //                     {stockInformation?.priceHistory && (
    //                         <table className="price-history-table">
    //                             <thead>
    //                                 <tr>
    //                                     <th>Ngày</th>
    //                                     <th>Sự kiện</th>
    //                                 </tr>
    //                             </thead>
    //                             <tbody>
    //                                 {stockInformation.priceHistory.map(
    //                                     (item, index) => (
    //                                         <tr key={index}>
    //                                             <td>{item.date}</td>
    //                                             <td>{item.event}</td>
    //                                         </tr>
    //                                     )
    //                                 )}
    //                             </tbody>
    //                         </table>
    //                     )}
    //                 </div>
    //             );
    //         default:
    //             return null;
    //     }
    // };

    return (
        <div className="stock-detail-page">
            {stockInformation && (
                <StockHeader
                    stockInformation={stockInformation}
                    financeRatio={financeRatio}
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
                stockPrice={newestStockPrice}
                handleChangePeriod={handleChangePeriod}
                lastData={lastData}
            />
        </div>
    );
}

export default StockInfor;
