import { IoIosSearch } from "react-icons/io";
import { IoMicOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import api from "./../../utils/api/Api.js";
import "./SearchBar.scss";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [stocks, setStock] = useState([]);
  const navigate = useNavigate();

  function handleKeywordChange(e) {
    setKeyword(e.target.value);
  }

  function handleClick(id) {
    navigate(`/stocks/${id}`);
  }

  function renderSearch() {
    return stocks.map((item) => {
      const { symbol, companyName } = item;
      return (
        <div
          key={symbol}
          className="search-item"
          onClick={() => {
            handleClick(symbol);
          }}
        >
          <span className="symbol">{symbol}</span>
          <span className="company-name">{companyName}</span>
        </div>
      );
    });
  }

  useEffect(() => {
    api.get(`/stock/find-stock?symbol=${keyword}`).then((response) => {
      const data = response.data;
      setStock(data);
    });
  }, [keyword]);

  return (
    <div className="search-container">
      <div className="Search_Bar">
        <IoIosSearch className="search_icon" />
        <input
          type="text"
          placeholder="Tìm kiếm theo mã cổ phiếu hoặc từ khoá..."
          onChange={handleKeywordChange}
          value={keyword}
        />
        <IoMicOutline className="mic_icon" />
      </div>
      <div className="search-result-container">{renderSearch()}</div>
    </div>
  );
}

export default SearchBar;
