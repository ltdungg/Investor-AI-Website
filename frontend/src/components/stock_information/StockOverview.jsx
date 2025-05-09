import React from "react";
import StockPriceGraphByPeriod from "./RenderDatas/RenderStockPriceGraphByPeriod.jsx";
import RenderStockPredict from "./RenderDatas/RenderStockPredict.jsx";

function StockOverview({ stockInformation, symbol, currPeriod, handleChangePeriod, lastData}) {
  const PERIOD_ENUM = ["/1-month", "/3-month", "/1-year", "/3-year", ""];
  const KEY_ENUM = ["1M", "3M", "1Y", "3Y", "ALL"];

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
        <div className="chart-section">
        <h3>Biểu đồ giá dự đoán</h3>
            <div className="stock-predict">
        <RenderStockPredict symbol={symbol} lastData={lastData.current} />
      </div>
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
}

export default StockOverview;