// stock_information.jsx (Modified Example)
import { useEffect, useState } from "react";
import StockPriceGraph from "./RenderDatas/RenderStockPriceGraph";
import getStockInformation from "../../utils/api/stock_api_utils/GetStockInformation.js";
import "./stock_information.scss";
import { useParams } from "react-router-dom";

function StockInfor() {
  const { symbol } = useParams();
  const [stockInformation, setStockInformation] = useState(null);

  useEffect(() => {
    if (symbol) {
      getStockInformation(symbol).then((response) =>
        setStockInformation(response.data)
      );
    }
  }, [symbol]);
  console.log(symbol, stockInformation);

  return (
    <div className="stock-infomation">
      <div className="chart">
        {symbol && <StockPriceGraph symbol={symbol} />}
      </div>

      {}
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
