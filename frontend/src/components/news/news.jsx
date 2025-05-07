import React, { useEffect, useState } from "react";
import "./NewsPage.css";
import api from "../../utils/api/Api";
import News from "../../enum/news";
import DateFormat from "../../utils/DateFormat";
import { Link } from "react-router-dom";
import ScrollTo from "../../utils/ScrollTo";

const NewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;
  const [data, setData] = useState([]);
  useEffect(() => {
    api.get("/news").then((response) => {
      const data = response.data
        .filter((item) => item) // Lọc bỏ item null
        .map((item) => new News(item));
      setData(data);
    });
  }, []);

  // Tính toán phân trang
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = data.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(data.length / newsPerPage);

  const handlePageChange = (pageNumber) => {
    ScrollTo(".header");
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
    <div className="news-container">
      <h1 className="page-title">Tin tức thị trường</h1>
      <div className="news-grid">
        {currentNews.map((news) => (
          <Link
            to={news.redirectUrl}
            key={news.id + news.title}
            className="news-card"
          >
            <div className="news-image-container">
              <img src={news.thumb} alt={news.title} className="news-image" />
            </div>
            <div className="news-content">
              <div className="news-meta">
                <span className="news-date">{DateFormat(news.date)}</span>
                <span className="news-source">{news.publisher}</span>
              </div>
              <h3 className="news-title">{news.title}</h3>
              <p className="news-description">{news.description}</p>
            </div>
          </Link>
        ))}
      </div>

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
};

export default NewsPage;
