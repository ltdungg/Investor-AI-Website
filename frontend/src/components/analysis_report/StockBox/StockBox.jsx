import React from "react";
import "./StockBox.scss";

const StockBox = ({ symbol, name, source, date, onClick }) => {
  return (
    <div className="stock-box" onClick={onClick}>
      <div className="stock-code">{symbol}</div>
      <div className="stock-title">{name}</div>
      <div className="stock-source">Nguồn: {source}</div>
      <div className="stock-date">Ngày đăng: {date}</div>
    </div>
  );
};

export default StockBox;
