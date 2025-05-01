import { IoMdSearch, IoIosArrowBack } from "react-icons/io";
import { PiMicrophoneLight } from "react-icons/pi";
import PopupContainer from "../PopupContainer/PobupContainer";
import "./Search.scss";
import { memo, useEffect, useState } from "react";
import api from "../../../utils/api/Api";
import { useNavigate } from "react-router-dom";

function Search(props) {
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
          title={companyName}
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
    <PopupContainer
      className={`search-container ${props.className}`}
      isVisible={props.isvisible}
    >
      <div className="search-bar">
        <IoIosArrowBack
          className="exit-search"
          onClick={() => props.onClose(false)}
        />
        <label htmlFor="search" className="search-box">
          <IoMdSearch />
          <input
            type="text"
            name="search"
            id="search"
            onChange={handleKeywordChange}
            placeholder="Tìm kiếm theo mã cổ phiếu hoặc từ khóa..."
          />
          <PiMicrophoneLight />
        </label>
      </div>
      <div className="search__suggest-stocks-container">{renderSearch()}</div>
    </PopupContainer>
  );
}

export default memo(Search);
