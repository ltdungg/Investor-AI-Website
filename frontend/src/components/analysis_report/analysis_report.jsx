import { useEffect, useRef } from "react";
import "./analysis_report.scss";
import { useState } from "react";
import StockBox from "./StockBox/StockBox";
import api from "./../../utils/api/Api";
import DateFormat from "../../utils/DateFormat";
import { useNavigate } from "react-router-dom";

function AnalysisReport() {
  const [currentPage, setCurrentPage] = useState(0);
  const [stocks, setStocks] = useState([]);
  const totalPages = stocks.length;
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [condition, setCondition] = useState(2025);
  const years = useRef(new Set([]));

  useEffect(() => {
    api.get(`/analysis-report/find?keyword=${keyword}`).then((response) => {
      const responseData = response.data.map((item) => ({
        ...item,
        publishedAt: new Date(item.publishedAt),
      }));
      responseData.sort((a, b) => b.publishedAt - a.publishedAt);
      const list = [];
      let j = 0;
      for (let i = 0; i < responseData.length; i++) {
        years.current.add(responseData[i].publishedAt.getUTCFullYear());
        if (condition == responseData[i].publishedAt.getUTCFullYear()) {
          if (!list[j]) list[j] = [];
          list[j].push(responseData[i]);
          if (list[j].length === 15) j++;
        }
      }

      console.log(years.current);

      console.log(list);
      setCurrentPage(0);
      setStocks(list);
    });
  }, [keyword, condition]);

  useEffect(() => {
    updatePagination();
  }, [currentPage]);

  const updatePagination = () => {
    document.querySelector(".pages-container").style.transform = `translateX(-${
      currentPage * 100
    }%)`;
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const findByYear = (e) => {
    const value = e.target.value;
    setCondition(value);
  };

  return (
    <div className="stock-slider">
      <h1 className="phan-tich-co-phieu-title">Phân tích cổ phiếu</h1>
      <div className="phan-tich-filter">
        <input
          className="keyword-input"
          type="text"
          placeholder="Nhập từ khóa"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <select name="year-filter" id="year-filter" onChange={findByYear}>
          {[...years.current].map((val) => (
            <option value={val} key={val} children={val} />
          ))}
        </select>
      </div>
      <div className="pages-container">
        {stocks.map((page, index) => (
          <div
            className={`page ${index === currentPage ? "active" : ""}`}
            key={index}
          >
            <div className="stock-container">
              {page.map((stock, stockIndex) => {
                return (
                  <StockBox
                    key={stockIndex}
                    symbol={stock.symbol}
                    name={stock.name}
                    source={stock.source}
                    date={DateFormat(stock.publishedAt)}
                    onClick={() => {
                      navigate(`/analysis/${stock.id}`);
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 0} id="prev">
          Previous
        </button>
        <span id="page-indicator">{`${currentPage + 1} / ${totalPages}`}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          id="next"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AnalysisReport;
