import React, { memo, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
import zoomPlugin from "chartjs-plugin-zoom";
import getStockPrice from "../../../utils/api/stock_api_utils/GetStockPrice";
import Annotation from "chartjs-plugin-annotation";
import {
  aggregateByYear,
  aggregateByMonth,
  getDailyData,
} from "../../../utils/GraphUtils/DataStockUtils.js";
import STOCK_ENUM from "../../../enum/STOCK_ENUM.js";
import {
  updatePosition,
  zoomHandle,
  zoomHandler,
} from "../../../utils/GraphUtils/zoom_handler.js";
import backgroundPlugin from "./BackgroundChartPLugin.js";

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


function StockPriceGraph({ symbol }) {
  const period = {
    year: "year",
    month: "month",
    day: "day",
  };
  // const [stockPrice, setStockPrice] = useState([]);
  const [curr, setCurr] = useState("");
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });
  const [dataYearly, setDataYearly] = useState({
    labels: [],
    datasets: [],
  });
  const [dataMonthly, setDataMonthly] = useState({
    labels: [],
    datasets: [],
  });
  const [dataDaily, setDataDaily] = useState({
    labels: [],
    datasets: [],
  });
  const [positon, setPositon] = useState({
    max: undefined,
    min: undefined,
  });
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    getStockPrice(symbol).then((response) => {
      const responseData = response.data.map((i) => {
        return {
          ...i,
          tradingDate: new Date(i[STOCK_ENUM.TRADING_DATE]),
        };
      });
      // setStockPrice(responseData);
      setCurr(period.year);
      setDataYearly(() => {
        const data = aggregateByYear(responseData);
        setAvg(data.prices[0]);
        return data;
      });
      setDataMonthly(aggregateByMonth(responseData));
      setDataDaily(getDailyData(responseData));
    });
    return () => {};
  }, []);

  useEffect(() => {
    switch (curr) {
      case period.year:
        updatePosition(setPositon, 0, dataYearly.labels.length - 1);
        zoomHandle(setData, data, dataYearly);
        break;
      case period.month:
        zoomHandle(setData, data, dataMonthly);
        break;
      default:
        zoomHandle(setData, data, dataDaily);
        break;
    }
  }, [curr]);

  const options = {
    animation: false,
    scales: {
      x: {
        type: "category",
        min: positon.min,
        max: positon.max,
      },
      y: { beginAtZero: false },
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
          onZoom: zoomHandler(
            curr,
            setCurr,
            period,
            dataYearly,
            dataMonthly,
            dataDaily,
            setPositon,
            setAvg
          ),
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
            yMin: avg,
            yMax: avg,
            borderColor: "rgba(0, 0, 0, 0.5)",
            borderWidth: 1,
            borderDash: [3, 3],
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default memo(StockPriceGraph);
