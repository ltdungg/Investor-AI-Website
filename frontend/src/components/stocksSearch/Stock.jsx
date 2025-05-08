import SearchBar from "./SearchBar";
import "./Stock.css";
import MarketStocks from "./MarketTable";
import { useEffect, useState } from "react";
import api from "../../utils/api/Api";
import Loading from "../loading/loading";
import StocksTable from "../StockPrice/StocksTable";

function Stock() {
  const limit = 5;
  const [highestStocks, setHighestStocks] = useState([]);
  const [lowestStocks, setLowestStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get("/stock/").then((response) => {
      const data = response.data || [];
      data.sort((a, b) => a.priceChange - b.priceChange);

      const low = [];
      const high = [];
      for (let i = 0; i < limit; i++) {
        low.push(data[i]);
        high.push(data[data.length - i - 1]);
      }

      setLowestStocks(low);
      setHighestStocks(high);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (lowestStocks.length && highestStocks.length) {
      setIsLoading(false);
    }
  }, [lowestStocks, highestStocks]);

  return (
    <div className="stocks_page">
      <div className="flex_container">
        <div className="search_container">
          <h1 className="search_container__title">Tìm kiếm một cổ phiếu để bắt đầu phân tích của bạn</h1>
          <p>
            Thông tin chính xác về gần 2000 cổ phiếu. Xem giá cổ phiếu, tin tức,
            tài chính, dự báo, biểu đồ và nhiều thông tin khác.
          </p>
          <SearchBar />
        </div>
      </div>
      <h1 className="Market_volatility">Diễn biến thị trường</h1>
      <div className="market_container">
        <MarketStocks title="Top Tăng Giá" stocks={highestStocks} />
        <MarketStocks title="Top Giảm Giá" stocks={lowestStocks} />
      </div>
      <StocksTable />
      {isLoading && <Loading />}
    </div>
  );
}

export default Stock;
