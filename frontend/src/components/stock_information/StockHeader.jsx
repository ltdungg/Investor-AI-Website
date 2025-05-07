import { Link, useParams, useLocation } from "react-router-dom";

function StockHeader({ stockInformation, formatPrice }) {
  const { symbol } = useParams();
  const location = useLocation();

  return (
    <>
      <div className="stock-header">
        <div className="stock-header-left">
          <h1 className="stock-code">{stockInformation.symbol || symbol}</h1>
          <h2 className="stock-name">{stockInformation.companyName}</h2>
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
                <span className="stock-intro-label">Ngành nghề:</span>
                <span className="stock-intro-value">
                  {stockInformation.industry || "N/A"}
                </span>
              </div>
              <div className="stock-intro-row">
                <span className="stock-intro-label">Sàn giao dịch:</span>
                <span className="stock-intro-value">
                  {stockInformation.exchange || "N/A"}
                </span>
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
              <span className="stock ​​​​​​stock-price">
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
              <strong>
                {stockInformation.financialMetrics?.marketCap || "N/A"}
              </strong>
            </div>
          </div>
          <div className="financial-metrics-grid">
            {[
              "pe",
              "pb",
              "roe",
              "eps",
              "EV/EBITDA",
              "ROA",
              "D/E",
              "Current Ratio",
            ].map((metric, index) => (
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
      <div className="tabs-container">
        <div className="tabs-header">
          <Link
            to={`/stocks/${symbol}`}
            className={`tab-link ${
              location.pathname === `/stocks/${symbol}` ? "active" : ""
            }`}
          >
            Tổng quan
          </Link>
          <Link
            to={`/stocks/${symbol}/financial`}
            className={`tab-link ${
              location.pathname === `/stocks/${symbol}/financial` ? "active" : ""
            }`}
          >
            Số liệu tài chính
          </Link>
          <Link
            to={`/stocks/${symbol}/priceHistory`}
            className={`tab-link ${
              location.pathname === `/stocks/${symbol}/priceHistory`
                ? "active"
                : ""
            }`}
          >
            Lịch sử giá
          </Link>
        </div>
      </div>
    </>
  );
}

export default StockHeader;