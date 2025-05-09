import { useEffect, useRef, useState } from "react";
import api from "../../../utils/api/Api.js";
import { Line } from "react-chartjs-2";
import { getChartData, getChartOptions } from "./ChartOption.js";
import PREDICT_ENUM from "../../../enum/PREDICT_ENUM.js";
import STOCK_ENUM from "../../../enum/STOCK_ENUM";
import ChartJS from "./ChartConfig.js";
import NumberFormat from "../../../utils/NumberFormat";

// Đảm bảo Chart.js được cấu hình
ChartJS;

function RenderStockPredict({ symbol = "" }) { // Đã bỏ prop lastData
  // State và refs
  const [historicalData, setHistoricalData] = useState([]);
  const [historicalDates, setHistoricalDates] = useState([]);
  const [predictData, setPredictData] = useState([]);
  const [predictDates, setPredictDates] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Khởi tạo lastData bên trong component
  const lastData = useRef({ value: 0 }); // Khởi tạo object với property value
  const avg = useRef(0);
  const chartRef = useRef(null);
  const mousePos = useRef({ x: null, y: null });

  useEffect(() => {
    setDataLoaded(false);

    api.get(`/stock-price/1-month/${symbol}`).then(histResponse => {
      const histData = histResponse?.data || [];
      const histDates = histData.map(item => new Date(item[STOCK_ENUM.TRADING_DATE]));
      const histPrices = histData.map(item => item[STOCK_ENUM.CLOSE]);

      if (histData.length > 0) {
        avg.current = histData[0][STOCK_ENUM.CLOSE] || 0;
        // Sửa cách gán giá trị cho lastData
        lastData.current.value = histData[histData.length - 1][STOCK_ENUM.CLOSE] || 0;
      }

      setHistoricalDates(histDates);
      setHistoricalData(histPrices);

      api.get(`/stock-predict/${symbol}`).then(predResponse => {
        const predData = predResponse?.data || [];
        const lastHistDate = histDates[histDates.length - 1] || new Date();

        const filteredPredictions = predData.filter(item =>
          item && new Date(item[PREDICT_ENUM.DATE]) > lastHistDate
        );

        const predDates = filteredPredictions.map(item =>
          new Date(item[PREDICT_ENUM.DATE])
        );
        const predPrices = filteredPredictions.map(item =>
          Number(item[PREDICT_ENUM.PRICE]) || 0
        );

        setPredictDates(predDates);
        setPredictData(predPrices);
      }).catch(console.error);
    }).catch(console.error).finally(() => {
      setDataLoaded(true);
    });
  }, [symbol]);

  // Xử lý sự kiện chuột cho crosshair
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
  }, [dataLoaded]);

  if (!dataLoaded || historicalData.length === 0) return null;

  // Tạo dataset cho biểu đồ
  const chartData = {
    datasets: [
      // Dataset cho dữ liệu lịch sử
      {
        ...getChartData(historicalDates, historicalData).datasets[0],
        label: "Giá thực tế",
        data: historicalDates.map((date, index) => ({
          x: date,
          y: historicalData[index]
        }))
      },
      // Dataset cho dữ liệu dự đoán (nếu có)
      ...(predictData.length > 0 ? [{
        label: "Dự đoán",
        data: predictDates.map((date, index) => ({
          x: date,
          y: predictData[index]
        })),
        borderColor: "#9c27b0", // Màu tím cho đường dự đoán
        borderWidth: 2.5,
        pointBackgroundColor: "#9c27b0",
        pointRadius: 3,
      }] : [])
    ]
  };

  // Tùy chọn biểu đồ
  const chartOptions = getChartOptions(
    avg.current,
    mousePos.current,
    [...historicalDates, ...predictDates],
    [...historicalData, ...predictData],
    "/1-month",
      false
  );

  chartOptions.scales = chartOptions.scales || {};
  chartOptions.scales.x = {
  ...(chartOptions.scales.x || {}),
  type: 'time',
  time: {
    unit: 'day',
    displayFormats: {
            day: "dd/MM",
            month: "MM yyyy",
            quarter: 'QQQ yyyy',
            year: 'yyyy'
          },
    tooltipFormat: 'dd/MM',
  },
  ticks: {
          maxTicksLimit: 6,
          source: 'data',
          autoSkip: true,
          maxRotation: 45,
          font: {
            size: 12
          }
        }
};

  return (
    <div className="stock-predict-chart">
      <Line
        ref={chartRef}
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
}

export default RenderStockPredict;
