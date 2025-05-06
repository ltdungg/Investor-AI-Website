import { useEffect, useRef, useState } from "react";
import StockPriceGraphByPeriod from "./RenderDatas/RenderStockPriceGraphByPeriod.jsx";
import RenderStockPredict from "./RenderDatas/RenderStockPredict.jsx";
import getStockInformation from "../../utils/api/stock_api_utils/GetStockInformation.js";
import { useParams } from "react-router-dom";
import "./stock_information.scss";

function StockInfor() {
  const PERIOD_ENUM = ["/1-month", "/3-month", "/1-year", "/3-year", "/all"];
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

  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "N/A";
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <div className="chart-section">
              <h3>Biểu đồ giá</h3>
              <div className="chart-period-selector">
                {PERIOD_ENUM.map((_, index) => (
                  <button
                    key={index}
                    className={currPeriod === index ? "active" : ""}
                    onClick={() => handleChangePeriod(index)}
                  >
                    {KEY_ENUM[index]}
                  </button>
                ))}
              </div>
              {symbol && (
                <StockPriceGraphByPeriod
                  symbol={symbol}
                  endpoint={PERIOD_ENUM[currPeriod]}
                  lastData={lastData}
                />
              )}
            </div>
            <div className="stock-predict">
              <RenderStockPredict symbol={symbol} lastData={lastData.current} />
            </div>
            {stockInformation && (
              <div className="company-info-section">
                <div className="company-info-box">
                  <h4>Lịch sử phát triển</h4>
                  <p>{stockInformation.historyDev || "Chưa có thông tin lịch sử."}</p>
                </div>
                <div className="company-info-box">
                  <h4>Chiến lược kinh doanh</h4>
                  <p>{stockInformation.businessStrategies || "Chưa có thông tin chiến lược."}</p>
                  {/* <ul>
                    {(stockInformation.businessStrategies  || []).map((strategy, index) => (
                      <li key={index}>{strategy}</li>
                    ))}
                  </ul> */}
                </div>
                <div className="company-info-box">
                    <h4>Rủi ro kinh doanh</h4>
                    <p>{stockInformation.businessRisk || "Chưa có thông tin rủi ro."}</p>
                </div>
                <div className="company-info-box">
                <h4>Các sự kiện phát triển</h4>
                <p>{stockInformation.keyDevelopments || "Chưa có thông tin sự kiện."}</p>
              </div>
              </div>
            )}
          </>
        );
      case "financial":
        return (
          <div className="financial-data-section">
            <h3>Số liệu tài chính</h3>
            {stockInformation?.financialMetrics && (
              <div className="financial-table-container">
                <h4>Chỉ số tài chính</h4>
                <table className="financial-table">
                  <tbody>
                    <tr>
                      <td>P/E</td>
                      <td>{stockInformation.financialMetrics.pe || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>P/B</td>
                      <td>{stockInformation.financialMetrics.pb || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>ROE</td>
                      <td>{stockInformation.financialMetrics.roe || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>EPS</td>
                      <td>{stockInformation.financialMetrics.eps || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Cổ tức</td>
                      <td>{stockInformation.financialMetrics.dividend || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Beta</td>
                      <td>{stockInformation.financialMetrics.beta || "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {stockInformation?.financialData?.balanceSheet && (
              <div className="financial-table-container">
                <h4>Cân đối kế toán</h4>
                <table className="financial-table">
                  <tbody>
                    {stockInformation.financialData.balanceSheet.map((item, index) => (
                      <tr key={index}>
                        <td>{item.metric}</td>
                        <td>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {stockInformation?.financialData?.incomeStatement && (
              <div className="financial-table-container">
                <h4>Báo cáo thu nhập</h4>
                <table className="financial-table">
                  <tbody>
                    {stockInformation.financialData.incomeStatement.map((item, index) => (
                      <tr key={index}>
                        <td>{item.metric}</td>
                        <td>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {stockInformation?.financialData?.cashFlow && (
              <div className="financial-table-container">
                <h4>Lưu chuyển tiền tệ</h4>
                <table className="financial-table">
                  <tbody>
                    {stockInformation.financialData.cashFlow.map((item, index) => (
                      <tr key={index}>
                        <td>{item.metric}</td>
                        <td>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      case "priceHistory":
        return (
          <div className="price-history-section">
            <h3>Lịch sử giá & Cổ tức</h3>
            {stockInformation?.priceHistory && (
              <table className="price-history-table">
                <thead>
                  <tr>
                    <th>Ngày</th>
                    <th>Sự kiện</th>
                  </tr>
                </thead>
                <tbody>
                  {stockInformation.priceHistory.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.event}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="stock-detail-page">
      {stockInformation && (
        <div className="stock-header">
          <div className="stock-header-left">
            <h1 className="stock-code">{stockInformation.symbol || symbol}</h1>
            <h2 className="stock-name">{stockInformation.companyName}</h2>
            <div className="stock-intro-box">
              <div className="stock-intro-icon">
                <svg width="36" height="36" fill="var(--primary-blue)" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
              <div className="stock-intro-content">
                <div className="stock-intro-row">
                  <span className="stock-intro-label">Ngành nghề:</span>
                  <span className="stock-intro-value">{stockInformation.industry || "N/A"}</span>
                </div>
                <div className="stock-intro-row">
                  <span className="stock-intro-label">Sàn giao dịch:</span>
                  <span className="stock-intro-value">{stockInformation.exchange || "N/A"}</span>
                </div>
                
              </div>
            </div>
            <div className="stock-description">
              <p>{stockInformation.description || "Chưa có mô tả."}</p>
            </div>
          </div>
          <div className="stock-header-right">
            <div className="price-container">
              <div className="price-group">
                <span className="stock-price">
                  {formatPrice(stockInformation.price)}
                </span>
                <span
                  className={`stock-price-change ${
                    stockInformation.priceChange >= 0 ? "positive" : "negative"
                  }`}
                >
                  {stockInformation.priceChange >= 0 ? "+" : ""}
                  {formatPrice(stockInformation.priceChange)} (
                  {stockInformation.percentChange}%)
                </span>
              </div>
              <div className="market-cap">
                <span>Vốn hóa thị trường</span>
                <strong>{stockInformation.financialMetrics?.marketCap || "N/A"}</strong>
              </div>
            </div>
            <div className="financial-metrics-grid">
              {["pe", "pb", "roe", "eps", "EV/EBITDA", "ROA", "D/E", "Current Ratio"].map((metric, index) => (
                <div className="metric-card" key={index}>
                  <div className="metric-label">{metric.toUpperCase()}</div>
                  <div className="metric-value">
                    {stockInformation.financialMetrics?.[metric] || "N/A"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="tabs-container">
        <div className="tabs-header">
          <button
            className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Tổng quan
          </button>
          <button
            className={`tab-button ${activeTab === "financial" ? "active" : ""}`}
            onClick={() => setActiveTab("financial")}
          >
            Số liệu tài chính
          </button>
          <button
            className={`tab-button ${activeTab === "priceHistory" ? "active" : ""}`}
            onClick={() => setActiveTab("priceHistory")}
          >
            Lịch sử giá
          </button>
        </div>
        <div className="tab-content">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default StockInfor;