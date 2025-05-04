import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import Annotation from "chartjs-plugin-annotation";
import zoomPlugin from "chartjs-plugin-zoom";
import backgroundPlugin from "./BackgroundChartPLugin.js";
import { useEffect, useRef, useState } from "react";
import api from "../../../utils/api/Api.js";
import STOCK_ENUM from "../../../enum/STOCK_ENUM";
import LINE_COLOR_ENUM from "../../../enum/LINE_COLOR_ENUM";
import { Line } from "react-chartjs-2";
import DateFormat from "../../../utils/DateFormat.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  Annotation,
  backgroundPlugin
);

function StockPriceGraphByPeriod({ endpoint = "/1-month", symbol = "" }) {
  const [stockData, setStockData] = useState([]);
  const avg = useRef(0);

  useEffect(() => {
    api.get(`/stock-price${endpoint}/${symbol}`).then((response) => {
      const responseData = response.data.map((i) => {
        return {
          ...i,
          tradingDate: new Date(i[STOCK_ENUM.TRADING_DATE]),
        };
      });

      console.log(responseData);
      setStockData(responseData);
      avg.current = responseData[0][STOCK_ENUM.CLOSE];
    });
  }, [endpoint, symbol]);

  const data = {
    // ...data,
    labels: stockData.map((stock) =>
      DateFormat(stock[STOCK_ENUM.TRADING_DATE])
    ),
    datasets: [
      {
        label: "Giá",
        data: stockData.map((stock) => stock[STOCK_ENUM.CLOSE]),
        borderColor: LINE_COLOR_ENUM.GREEN,
        pointRadius: 0,
        pointHoverRadius: 5, // Hiển thị điểm khi hover (tùy chọn)
        pointHoverBackgroundColor: LINE_COLOR_ENUM.GREEN, // Màu điểm khi hover
        pointHoverBorderColor: LINE_COLOR_ENUM.GREEN, // Viền điểm khi hover
        // tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    animation: false,
    scales: {
      y: { beginAtZero: false },
      x: { display: false }, // Ẩn nhãn ngày tháng trên trục x
    },
    interaction: {
      mode: "nearest", // Tìm điểm gần nhất dựa trên vị trí chuột
      intersect: false, // Không yêu cầu chuột phải giao với điểm, chỉ cần gần là được
      axis: "x", // Chỉ xét khoảng cách theo trục X
    },
    plugins: {
      legend: {
        display: false, // Ẩn nhãn "Giá" và hộp chữ nhật
      },
      tooltip: { enabled: true },
      zoom: {
        limits: { x: { minRange: 1 } },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "x", // Chỉ zoom theo trục X
        },
        pan: {
          enabled: true, // Bật kéo thả để di chuyển
          mode: "x",
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: avg.current,
            yMax: avg.current,
            borderColor: "rgba(0, 0, 0, 0.5)",
            borderWidth: 1,
            borderDash: [3, 3],
          },
        },
      },
    },
  };

  if (stockData.length <= 0) {
    return (
      <div
        className="chart-no-data"
        children="Khoảng thời gian này cổ phiểu đang không có dữ liệu :("
      />
    );
  }

  return <Line data={data} options={options} />;
}

export default StockPriceGraphByPeriod;
