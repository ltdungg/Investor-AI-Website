import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getStockInformation from "../../utils/api/stock_api_utils/GetStockInformation.js";
import StockHeader from "./StockHeader";

function StockOverview() {
  const { symbol } = useParams();
  const [stockInformation, setStockInformation] = useState(null);

  useEffect(() => {
    if (symbol) {
      getStockInformation(symbol).then((response) =>
        setStockInformation(response.data)
      );
    }
  }, [symbol]);

  const formatPrice = (price) =>
    price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "N/A";

  return (
    <div className="stock-detail-page">
      {stockInformation && (
        <StockHeader
          stockInformation={stockInformation}
          formatPrice={formatPrice}
        />
      )}
      <div className="chart-section">
        <h3>Biểu đồ giá</h3>
      </div>
    </div>
  );
}

export default StockOverview;