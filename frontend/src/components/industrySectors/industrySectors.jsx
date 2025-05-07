import React, { useState, useEffect } from 'react';
import './IndustrySectors.scss';
// import apiFetchIndustryData from './apiUtils'; // Giả sử có hàm fetch API

// Dữ liệu giả lập - Thay thế bằng API call thực tế
const mockSummaryData = {
  totalStocks: 1609,
  marketCap: '6,594,792T',
  pe: 11.85,
  pb: 1.66,
};

const mockSectorsData = [
  { id: 1, name: 'Tài chính', stocks: 80, marketCap: '2,413,772T', pe: 9.93, pb: 1.53, dividendYield: '1.88%', growth3Y: '11.95%', price1D: '-0.87%', price7D: '0.21%', priceYTD: '-2.04%', price1Y: '6.84%', price3Y: '35.70%' },
  { id: 2, name: 'Bất động sản', stocks: 129, marketCap: '972,039T', pe: 19.77, pb: 1.81, dividendYield: '0.88%', growth3Y: '0.96%', price1D: '-0.09%', price7D: '3.17%', priceYTD: '35.58%', price1Y: '30.21%', price3Y: '-13.40%' },
  { id: 3, name: 'Công nghiệp', stocks: 468, marketCap: '843,396T', pe: 15.58, pb: 1.18, dividendYield: '2.13%', growth3Y: '14.27%', price1D: '-1.17%', price7D: '1.35%', priceYTD: '1.48%', price1Y: '20.87%', price3Y: '23.00%' },
  { id: 4, name: 'Hàng hóa thiết yếu', stocks: 186, marketCap: '655,091T', pe: 14.08, pb: 3.96, dividendYield: '10.55%', growth3Y: '5.88%', price1D: '0.24%', price7D: '-0.57%', priceYTD: '-11.22%', price1Y: '13.59%', price3Y: '27.78%' },
  { id: 5, name: 'Công nghệ', stocks: 36, marketCap: '438,830T', pe: 18.41, pb: 4.68, dividendYield: '2.57%', growth3Y: '13.49%', price1D: '-1.13%', price7D: '-0.26%', priceYTD: '-22.86%', price1Y: '6.61%', price3Y: '81.98%' },
  { id: 6, name: 'Nguyên vật liệu', stocks: 261, marketCap: '428,789T', pe: 15.11, pb: 2.49, dividendYield: '1.72%', growth3Y: '16.10%', price1D: '-1.45%', price7D: '1.12%', priceYTD: '4.55%', price1Y: '70.79%', price3Y: '38.84%' },
  { id: 7, name: 'Hàng hóa không thiết yếu', stocks: 195, marketCap: '399,547T', pe: 16.54, pb: 2.12, dividendYield: '2.43%', growth3Y: '14.48%', price1D: '-1.43%', price7D: '2.36%', priceYTD: '-8.56%', price1Y: '-0.26%', price3Y: '4.41%' },
  // Thêm các ngành khác nếu cần
];
// Hàm tiện ích để format số liệu phần trăm và thêm class màu
const formatPercent = (value) => {
  if (value === null || value === undefined || value === '') return '-';
  const num = parseFloat(value.replace('%', ''));
  if (isNaN(num)) return '-';

  const className = num > 0 ? 'positive' : num < 0 ? 'negative' : 'neutral';
  return <span className={className}>{num.toFixed(2)}%</span>;
};

// Hàm tiện ích để format số P/E, P/B
const formatRatio = (value) => {
    if (value === null || value === undefined) return '-';
    const num = parseFloat(value);
    return isNaN(num) ? '-' : num.toFixed(2);
}

// Hàm format số lượng cổ phiếu hoặc vốn hóa
const formatNumberSimple = (value) => {
     if (value === null || value === undefined) return '-';
     // Bạn có thể thêm logic phức tạp hơn để format số lớn (vd: 1,609 hoặc 6,594T)
     return value.toLocaleString ? value.toLocaleString('vi-VN') : value;
}

const formatMarketCap = (value) => {
     if (value === null || value === undefined || typeof value !== 'string') return '-';
     // Giữ nguyên định dạng 'T' nếu có
     return value;
}


function IndustrySectors() {
  const [summaryData, setSummaryData] = useState(null);
  const [sectorsData, setSectorsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // --- Thay thế phần này bằng API call thực tế ---
    setIsLoading(true);
    setError(null);
    // Giả lập fetch data
    const timer = setTimeout(() => {
      try {
        setSummaryData(mockSummaryData);
        setSectorsData(mockSectorsData);
        setIsLoading(false);
      } catch (err) {
        setError('Không thể tải dữ liệu ngành.');
        setIsLoading(false);
      }
    }, 500); // Giả lập độ trễ mạng

    return () => clearTimeout(timer);
    // --- Kết thúc phần thay thế ---

    /*
    // --- Code API call thực tế (ví dụ) ---
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // const responseSummary = await fetch('/api/market-summary'); // URL API tổng hợp
        // const summary = await responseSummary.json();
        // const responseSectors = await fetch('/api/industry-sectors'); // URL API ngành
        // const sectors = await responseSectors.json();

        // Giả sử API trả về đúng cấu trúc
        const summary = mockSummaryData; // Thay bằng dữ liệu API thật
        const sectors = mockSectorsData; // Thay bằng dữ liệu API thật

        setSummaryData(summary);
        setSectorsData(sectors);
      } catch (err) {
        console.error("API Error:", err);
        setError('Lỗi kết nối đến máy chủ.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    */

  }, []); // Fetch data một lần khi component mount

  if (isLoading) {
    return <div className="loading-indicator">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="industry-sectors-page">
      <h2>Các nhóm ngành</h2>

      {summaryData && (
        <div className="summary-header">
          <div className="summary-item">
            <span className="label">Số lượng cổ phiếu</span>
            <span className="value">{formatNumberSimple(summaryData.totalStocks)}</span>
          </div>
          <div className="summary-item">
            <span className="label">Vốn hoá</span>
            <span className="value">{formatMarketCap(summaryData.marketCap)}</span>
          </div>
          <div className="summary-item">
            <span className="label">P/E</span>
            <span className="value">{formatRatio(summaryData.pe)}</span>
          </div>
          <div className="summary-item">
            <span className="label">P/B</span>
            <span className="value">{formatRatio(summaryData.pb)}</span>
          </div>
        </div>
      )}

      <div className="sectors-table-container">
        <table className="sectors-table">
          <thead>
            <tr>
              <th className="text-left sticky-col">Nhóm ngành ↕</th>
              <th className="text-right">Số lượng cổ phiếu ↕</th>
              <th className="text-right">Vốn hóa ↕</th>
              <th className="text-right">P/E ↕</th>
              <th className="text-right">P/B ↕</th>
              <th className="text-right">Tỷ suất cổ tức ↕</th>
              <th className="text-right">T.trưởng LNST 3 năm dự phóng ↕</th>
              <th className="text-right">% Giá 1D ↕</th>
              <th className="text-right">% Giá 7D ↕</th>
              <th className="text-right">% Giá YTD ↕</th>
              <th className="text-right">% Giá 1Y ↕</th>
              <th className="text-right">% Giá 3Y ↕</th>
            </tr>
          </thead>
          <tbody>
            {sectorsData.map((sector) => (
              <tr key={sector.id}>
                <td className="text-left sticky-col sector-name">{sector.name}</td>
                <td className="text-right">{formatNumberSimple(sector.stocks)}</td>
                <td className="text-right">{formatMarketCap(sector.marketCap)}</td>
                <td className="text-right">{formatRatio(sector.pe)}</td>
                <td className="text-right">{formatRatio(sector.pb)}</td>
                <td className="text-right">{formatPercent(sector.dividendYield)}</td>
                <td className="text-right">{formatPercent(sector.growth3Y)}</td>
                <td className="text-right">{formatPercent(sector.price1D)}</td>
                <td className="text-right">{formatPercent(sector.price7D)}</td>
                <td className="text-right">{formatPercent(sector.priceYTD)}</td>
                <td className="text-right">{formatPercent(sector.price1Y)}</td>
                <td className="text-right">{formatPercent(sector.price3Y)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IndustrySectors;