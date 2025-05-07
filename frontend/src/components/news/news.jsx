import React, { useState } from 'react';
import './NewsPage.css';

const NewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  // Dữ liệu tin tức mẫu
  const newsData = [
    {
      id: 1,
      image: 'https://picsum.photos/400/300?random=1',
      title: 'Thị trường chứng khoán phục hồi mạnh đầu phiên sáng',
      date: '06/05/2025 09:15',
      description: 'Chỉ số VN-Index tăng điểm ngay sau khi mở cửa nhờ sự hồi phục của nhóm cổ phiếu ngân hàng và bất động sản...',
      source: 'Vietstock'
    },
    {
      id: 2,
      image: 'https://picsum.photos/400/300?random=2',
      title: 'Ngân hàng Nhà nước công bố chính sách tiền tệ mới',
      date: '05/05/2025 16:30',
      description: 'Lãi suất điều hành được giữ nguyên trong khi các biện pháp hỗ trợ thanh khoản tiếp tục được triển khai...',
      source: 'Cafef'
    },
    // Thêm 10 item mẫu khác
  ];

  // Tính toán phân trang
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = newsData.slice(indexOfFirstNews, indexOfLastNews);

  const totalPages = Math.ceil(newsData.length / newsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="news-container">
      <h1 className="page-title">Tin tức thị trường</h1>
      
      <div className="news-grid">
        {currentNews.map((news) => (
          <div key={news.id} className="news-card">
            <div className="news-image-container">
              <img src={news.image} alt={news.title} className="news-image" />
            </div>
            <div className="news-content">
              <div className="news-meta">
                <span className="news-date">{news.date}</span>
                <span className="news-source">{news.source}</span>
              </div>
              <h3 className="news-title">{news.title}</h3>
              <p className="news-description">{news.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        <button 
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        
        <button 
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
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
