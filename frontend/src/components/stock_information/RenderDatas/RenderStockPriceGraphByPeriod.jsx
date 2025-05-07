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
import NumberFormat from "../../../utils/NumberFormat.js";

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

// Crosshair plugin để hiển thị đường theo vị trí chuột
const crosshairPlugin = {
  id: "crosshair",
  afterEvent: (chart, args) => {
    const event = args.event;
    if (!chart.$mouse) chart.$mouse = { x: null, y: null, active: false };
    if (event && event.type === "mousemove") {
      chart.$mouse = {
        x: event.x,
        y: event.y,
        active: true,
      };
      chart.draw();
    } else if (
      event &&
      (event.type === "mouseout" || event.type === "mouseleave")
    ) {
      chart.$mouse.active = false;
      chart.draw();
    }
  },
  afterDraw: (chart) => {
    const { ctx, chartArea } = chart;
    if (!chart.$mouse || !chart.$mouse.active) return;
    const { x, y } = chart.$mouse;

    // Kiểm tra chuột nằm trong chartArea
    if (
      x < chartArea.left ||
      x > chartArea.right ||
      y < chartArea.top ||
      y > chartArea.bottom
    )
      return;

    ctx.save();
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = "#1a237e";
    ctx.lineWidth = 1;

    // Vẽ đường dọc
    ctx.beginPath();
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.stroke();

    // Vẽ đường ngang
    ctx.beginPath();
    ctx.moveTo(chartArea.left, y);
    ctx.lineTo(chartArea.right, y);
    ctx.stroke();

    ctx.restore();
  },
};

// Đăng ký plugin crosshair
ChartJS.register(crosshairPlugin);

function StockPriceGraphByPeriod({
  endpoint = "/1-month",
  symbol = "",
  lastData = {},
}) {
  const [stockData, setStockData] = useState([]);
  const [stockDate, setStockDate] = useState([]);
  const avg = useRef(0);
  const chartRef = useRef(null);
  const mousePos = useRef({ x: null, y: null });

  useEffect(() => {
    api.get(`/stock-price${endpoint}/${symbol}`).then((response) => {
      const responseData = response.data.map((i) => {
        return {
          ...i,
          tradingDate: new Date(i[STOCK_ENUM.TRADING_DATE]),
        };
      });

      setStockData(responseData.map((stock) => stock[STOCK_ENUM.CLOSE]));
      setStockDate(responseData.map((stock) => stock[STOCK_ENUM.TRADING_DATE]));
      avg.current = responseData[0][STOCK_ENUM.CLOSE];
      lastData.current =
        responseData[responseData.length - 1][STOCK_ENUM.CLOSE];
      console.log(lastData.current);
    });
  }, [endpoint, symbol]);

  // Xử lý sự kiện di chuyển chuột
  useEffect(() => {
    const handleMouseMove = (e) => {
      const chart = chartRef.current;
      if (!chart) return;
      const canvas = chart.canvas;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      mousePos.current = {
        x: xScale.getValueForPixel(x),
        y: yScale.getValueForPixel(y),
        clientX: x,
        clientY: y,
      };
      chart.update("none");
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: null, y: null };
      chartRef.current?.update("none");
    };

    const chart = chartRef.current;
    if (chart) {
      chart.canvas.addEventListener("mousemove", handleMouseMove);
      chart.canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (chart) {
        chart.canvas.removeEventListener("mousemove", handleMouseMove);
        chart.canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const data = {
    // ...data,
    labels: stockDate.map((stock) => DateFormat(stock)),
    datasets: [
      {
        label: "Giá",
        data: stockData,
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
            label: {
              display: true,
              content: `${NumberFormat(avg.current)}`,
              position: "end",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              padding: 4,
              font: {
                size: 12,
                weight: "bold",
              },
            },
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

  return <Line data={data} options={options} ref={chartRef} />;
}

export default StockPriceGraphByPeriod;
