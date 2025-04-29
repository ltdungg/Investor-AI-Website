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
import DateFormat from "../../../utils/DateFormat";
import getStockPrice from "../../../utils/api/stock_api_utils/GetStockPrice";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const stock = {
  tradingDate: "tradingDate",
  close: "close",
};

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

  useEffect(() => {
    getStockPrice(symbol).then((response) => {
      const responseData = response.data.map((i) => {
        return {
          ...i,
          tradingDate: new Date(i[stock.tradingDate]),
        };
      });
      // setStockPrice(responseData);
      setCurr(period.year);
      setDataYearly(() => aggregateByYear(responseData));
      setDataMonthly(() => aggregateByMonth(responseData));
      setDataDaily(() => getDailyData(responseData));
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
    return () => {};
  }, [curr]);

  function updatePosition(setPositon, min, max) {
    setPositon({
      min: min,
      max: max,
    });
  }

  // Hàm tổng hợp dữ liệu theo năm
  const aggregateByYear = (data) => {
    const yearlyData = {};
    data.forEach((stockData) => {
      const tradingDate = stockData[stock.tradingDate];
      const close = stockData[stock.close];
      const year = tradingDate.getUTCFullYear();
      if (!yearlyData[year]) {
        yearlyData[year] = { total: 0, count: 0 };
      }
      yearlyData[year].total += close;
      yearlyData[year].count += 1;
    });

    return {
      labels: Object.keys(yearlyData),
      prices: Object.values(yearlyData).map((d) =>
        (d.total / d.count).toFixed(2)
      ),
    };
  };

  // Hàm tổng hợp dữ liệu theo tháng
  const aggregateByMonth = (data) => {
    const monthlyData = {};
    data.forEach((stockData) => {
      const tradingDate = stockData[stock.tradingDate];
      const close = stockData[stock.close];

      const month = `${
        tradingDate.getUTCMonth() + 1
      }/${tradingDate.getUTCFullYear()}`;

      if (!monthlyData[month]) {
        monthlyData[month] = { total: 0, count: 0 };
      }
      monthlyData[month].total += close;
      monthlyData[month].count += 1;
    });
    return {
      labels: Object.keys(monthlyData),
      prices: Object.values(monthlyData).map((d) =>
        (d.total / d.count).toFixed(2)
      ),
    };
  };

  // Hàm lấy dữ liệu chi tiết theo ngày
  const getDailyData = (data) => {
    return {
      labels: data.map((d) => DateFormat(d[stock.tradingDate]) + ""),
      prices: data.map((d) => d[stock.close]),
    };
  };

  const zoomHandler = ({ chart }) => {
    const xScale = chart.scales.x;
    const visibleRange = xScale.max - xScale.min;
    switch (curr) {
      case period.year:
        if (visibleRange <= 1) {
          const curYear = dataYearly.labels[xScale.min];
          const start = dataMonthly.labels.findIndex((label) => {
            let year = label.split("/");
            return year[year.length - 1] == curYear;
          });
          const end = start + 11;
          updatePosition(setPositon, start, end);
          setCurr(period.month);
        }
        break;
      case period.month:
        if (visibleRange <= 1) {
          const curMonth = dataMonthly.labels[xScale.min];
          const start = dataDaily.labels.findIndex((label) => {
            let date = label.split("/");
            return `${date[1]}/${date[2]}` == curMonth;
          });
          const end = start + 31;
          updatePosition(setPositon, start, end);
          setCurr(period.day);
        } else if (visibleRange >= 24) {
          setCurr(period.year);
          break;
        }
        break;
      case period.day:
        if (visibleRange >= 31) {
          const curDate = dataDaily.labels[xScale.min];
          let date = curDate.split("/");
          const start = dataMonthly.labels.findIndex((label) => {
            const month = label.split("/");
            return `${month[0]}/${month[1]}` == `${date[1]}/${date[2]}`;
          });
          updatePosition(setPositon, start, start + 11);
          setCurr(period.month);
        }
        break;
    }
  };

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
      title: {
        display: true,
        text: "Biểu đồ Doanh Thu",
      },
      tooltip: { enabled: true },
      zoom: {
        limits: { x: { minRange: 1 } },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "x", // Chỉ zoom theo trục X
          onZoom: zoomHandler,
        },
        pan: {
          enabled: true, // Bật kéo thả để di chuyển
          mode: "x",
        },
      },
    },
  };

  function zoomHandle(setData, data, daily) {
    setData({
      // ...data,
      labels: daily.labels,
      datasets: [
        {
          label: "Giá",
          data: daily.prices,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 0,
          pointHoverRadius: 5, // Hiển thị điểm khi hover (tùy chọn)
          //   pointHoverBackgroundColor: "rgb(75, 192, 192)", // Màu điểm khi hover
          pointHoverBorderColor: "rgba(75, 192, 192, 0.8)", // Viền điểm khi hover
          // tension: 0.1,
        },
      ],
    });
  }

  return <Line data={data} options={options} />;
}

export default memo(StockPriceGraph);
