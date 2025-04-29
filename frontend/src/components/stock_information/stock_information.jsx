import { useEffect, useRef, useState } from "react";
import StockPriceGraph from "./RenderDatas/RenderStockPriceGraph";
import getStockInformation from "../../utils/api/stock_api_utils/GetStockInformation.js";
import "./stock_information.scss";

function StockInfor() {
  const url = window.location.pathname.split("/");
  const symbolRef = useRef(url[url.length - 1]);
  const symbol = symbolRef.current;
  const [stockInformation, setStockInformation] = useState(null);

  useEffect(() => {
    if (symbol) {
      getStockInformation(symbol).then((response) =>
        setStockInformation(response.data)
      );
    }
  }, []);

  console.log(symbol, stockInformation);

  return (
    <div className="stock-infomation">
      <div className="chart">
        {symbol && <StockPriceGraph symbol={symbol} />}
        {stockInformation && Object.values(stockInformation).map(i => <div>{i}</div>)}
      </div>
    </div>
  );
}

export default StockInfor;
