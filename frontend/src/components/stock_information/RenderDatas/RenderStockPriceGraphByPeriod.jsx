import { useEffect, useRef, useState } from "react";
import api from "../../../utils/api/Api.js";
import STOCK_ENUM from "../../../enum/STOCK_ENUM";
import { Line } from "react-chartjs-2";
import { getChartData, getChartOptions } from "./ChartOption.js";
import ChartJS from "./ChartConfig.js";

ChartJS;

function StockPriceGraphByPeriod({
  endpoint = "/1-month",
  symbol = "",
  className,
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
      lastData.current = responseData[responseData.length - 1][STOCK_ENUM.CLOSE];
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

  if (stockData.length <= 0) {
    return null;
  }

  return (
    <Line
      ref={chartRef}
      data={getChartData(stockDate, stockData)}
      options={getChartOptions(avg.current, mousePos, stockDate, stockData, endpoint, true)}
      className={className}
    />
  );
}

export default StockPriceGraphByPeriod;