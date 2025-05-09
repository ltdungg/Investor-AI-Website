import { useEffect, useRef, useState } from "react";
import getAllIndustries from "../../utils/api/stock_api_utils/GetAllIndustries";
import StockPriceTr from "./StockPriceTable/StockPriceTr";
import StockFilter from "./StockFilter";
import "./StocksTable.scss";
import api from "../../utils/api/Api";
import IcbFilter from "./IcbFilter";

function StocksTable() {
  const [stocks, setStocks] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const exchangeTemplate = useRef(["HOSE", "UPCOM", "HNX"]);
  const [exchange, setExchange] = useState(["HOSE", "HNX"]);
  const [icb, setIcb] = useState([]);
  const [curIcb, setCurIcb] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const newsPerPage = 20;

  useEffect(() => {
    getAllIndustries().then((response) => {
      const responseData = response.data;
      const data = [];
      const temp = [];
      responseData.forEach((element) => {
        if (element.level === 1) {
          data[element.icbId] = element;
          temp.push(element.icbId);
        }
      });
      setIcb(temp);
      setIndustries(data);
    });
  }, []);

  useEffect(() => {
    api
      .get("/stock/", {
        params: {
          exchange: exchange, // Mảng chuỗi, ví dụ: ["NYSE", "NASDAQ"] hoặc chuỗi "NYSE"
          icb: curIcb, // Mảng số, ví dụ: [1, 2] hoặc số 1
          page: currentPage, // Số, ví dụ: 1
        },
        paramsSerializer: (params) => {
          // Tùy chỉnh serialize để hỗ trợ danh sách
          const searchParams = new URLSearchParams();
          if (params.exchange) {
            if (Array.isArray(params.exchange)) {
              params.exchange.forEach((value) =>
                searchParams.append("exchange", value)
              );
            } else {
              searchParams.append("exchange", params.exchange);
            }
          }
          if (params.icb) {
            if (Array.isArray(params.icb)) {
              params.icb.forEach((value) => searchParams.append("icb", value));
            } else {
              searchParams.append("icb", params.icb);
            }
          }
          if (params.page) {
            searchParams.append("page", params.page);
          }
          return searchParams.toString();
        },
      })
      .then((response) => {
        const responseData = response.data;
        setStocks(responseData);
      })
      .catch((error) => {
        console.error("Error fetching stocks:", error);
      });
  }, [exchange, curIcb, currentPage]);

  useEffect(() => {
    api
      .get("/stock/page/", {
        params: {
          exchange: exchange, // Có thể là mảng ["NYSE", "NASDAQ"] hoặc chuỗi "NYSE"
          icb: curIcb, // Có thể là mảng [1, 2] hoặc số 1
        },
        paramsSerializer: (params) => {
          // Tùy chỉnh cách serialize để hỗ trợ danh sách
          const searchParams = new URLSearchParams();
          if (params.exchange) {
            if (Array.isArray(params.exchange)) {
              params.exchange.forEach((value) =>
                searchParams.append("exchange", value)
              );
            } else {
              searchParams.append("exchange", params.exchange);
            }
          }
          if (params.icb) {
            if (Array.isArray(params.icb)) {
              params.icb.forEach((value) => searchParams.append("icb", value));
            } else {
              searchParams.append("icb", params.icb);
            }
          }
          return searchParams.toString();
        },
      })
      .then((response) => {
        const responseData = response.data;
        setTotalPages(Math.ceil(responseData / newsPerPage));
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error("Error fetching stocks:", error);
      });
  }, [exchange, curIcb]);

  // Tính toán phân trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Tạo danh sách các nút phân trang
  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5; // Tối đa 5 nút hiển thị
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    // Điều chỉnh startPage nếu endPage không đủ số nút
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // Thêm nút "..." ở đầu nếu cần
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          className={`pagination-button ${currentPage === 1 ? "active" : ""}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="start-ellipsis" className="pagination-ellipsis">
            ...
          </span>
        );
      }
    }

    // Thêm các nút trang
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          className={`pagination-button ${
            currentPage === page ? "active" : ""
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      );
    }

    // Thêm nút "..." ở cuối nếu cần
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="end-ellipsis" className="pagination-ellipsis">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          className={`pagination-button ${
            currentPage === totalPages ? "active" : ""
          }`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="stock-price-container">
      <header className="stock-price__header">
        <h1>Bảng giá cổ phiếu</h1>
        <div className="stock-price__filters">
          <StockFilter
            filterName="Sàn"
            conditions={exchangeTemplate.current}
            currentCondiTion={exchange}
            setCurrentCondition={setExchange}
          />
          <IcbFilter
            filterName="Nhóm ngành"
            curIcb={curIcb}
            icbId={icb}
            industries={industries}
            setCurrentCondition={setCurIcb}
          />
        </div>
      </header>
      <table className="stock-price__table">
        <thead>
          <tr>
            <th>Mã cổ phiếu</th>
            {/* <th>Vốn hóa</th> */}
            <th>Giá hiện tại</th>
            <th>Biến động giá</th>
            <th>Sàn</th>
            <th>Ngành</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            return (
              <StockPriceTr
                key={stock.symbol}
                id={stock.symbol}
                name={stock.companyName}
                price={stock.close}
                fluctuation={stock.priceChange}
                platform={stock.exchange}
                industry={
                  industries[stock.icb1]
                    ? industries[stock.icb1].icbName
                    : undefined
                }
              />
            );
          })}
        </tbody>
      </table>
      <div className="pagination-container">
        <button
          className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>

        {getPaginationButtons()}

        <button
          className={`pagination-button ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default StocksTable;
