// stock_information.jsx (Modified Example)
import { useEffect, useRef, useState } from "react";
import StockPriceGraph from "./RenderDatas/RenderStockPriceGraph";
import getStockInformation from "../../utils/api/stock_api_utils/GetStockInformation.js";
import "./stock_information.scss";
import { useParams } from "react-router-dom";
import StockPriceGraphByPeriod from "./RenderDatas/RenderStockPriceGraphByPeriod.jsx";
import RenderStockPredict from "./RenderDatas/RenderStockPredict.jsx";

function StockInfor() {
  const PERIOD_ENUM = ["/1-month", "/3-month", "/1-year", "/3-year"];
  const KEY_ENUM = ["1M", "3M", "1Y", "3Y"];
  const { symbol } = useParams();
  const [stockInformation, setStockInformation] = useState(null);
  const [currPeriod, setCurrPeriod] = useState(1);
  const lastData = useRef(0);

  useEffect(() => {
    if (symbol) {
      getStockInformation(symbol).then((response) =>
        setStockInformation(response.data)
      );
    }
  }, [symbol]);
  console.log(symbol, stockInformation);

  function handleChangePeriod(index) {
    setCurrPeriod(index);
  }

  function styleCurrent(index) {
    return currPeriod === index ? { background: "#80d6e4" } : undefined;
  }

  return (
    <div className="stock-infomation">
      <div className="chart">
        {/* {symbol && <StockPriceGraph symbol={symbol} />} */}
        {symbol && (
          <StockPriceGraphByPeriod
            symbol={symbol}
            endpoint={PERIOD_ENUM[currPeriod]}
            lastData={lastData}
          />
        )}
      </div>
      <div className="stock-predict">
        {/* <RenderStockPredict symbol={symbol} lastData={lastData.current}/> */}
      </div>
      <div className="btns-change-period">
        {PERIOD_ENUM.map((_, index) => (
          <button
            key={index}
            style={styleCurrent(index)}
            onClick={() => handleChangePeriod(index)}
            children={KEY_ENUM[index]}
          />
        ))}
      </div>

      {stockInformation && (
        <div className="stock-details">
          <div className="stock-symbol">
            {stockInformation.symbol || symbol}
          </div>

          <div className="stock-name">{stockInformation.companyName}</div>

          <div className="stock-exchange">
            Exchange: {stockInformation.exchange}
          </div>

          <div className="stock-description">
            Industry: {stockInformation.description}
          </div>

          {/* <p className="stock-description">{stockInformation.historyDev}</p> */}
        </div>
      )}
    </div>
  );
}

export default StockInfor;
