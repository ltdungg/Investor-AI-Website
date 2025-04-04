import StockPriceGraph from "./RenderDatas/RenderStockPriceGraph";
import "./stock_information.scss";

function StockInfor() {
  return (
    <div className="chart">
      <StockPriceGraph />
    </div>
  );
}

export default StockInfor;
