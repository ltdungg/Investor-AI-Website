import React, { useEffect, useState } from "react";
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
import "./stock_information.scss";
import axios from "axios";
import DateFormat from "../../utils/DateFormat";

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

function StockInfor() {
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
    axios
      .get("http://localhost:3000/src/components/stock_information/sample.json")
      .then((response) => {
        const responseData = response.data.map((i) => {
          return {
            ...i,
            tradingDate: new Date(i.tradingDate),
          };
        });
        // setStockPrice(responseData);
        setCurr(period.year);
        setDataYearly(() => aggregateByYear(responseData));
        setDataMonthly(() => aggregateByMonth(responseData));
        setDataDaily(() => getDailyData(responseData));
      });
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

  const options = {
    transitions: {
      zoom: {
        animation: {
          duration: 0,
        },
      },
    },
    scales: {
      x: {
        type: "category",
        min: positon.min,
        max: positon.max,
      },
      y: {
        beginAtZero: false,
      },
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
      tooltip: {
        enabled: true,
      },
      zoom: {
        limits: {
          x: {
            minRange: 1, // Phạm vi tối thiểu khi zoom (ít nhất 2 điểm)
          },
        },
        zoom: {
          wheel: {
            enabled: true, // Bật zoom bằng bánh xe chuột
          },
          pinch: {
            enabled: true, // Bật zoom bằng cử chỉ pinch (điện thoại)
          },
          mode: "x", // Chỉ zoom theo trục X
          onZoomComplete: ({ chart }) => {
            const xScale = chart.scales.x;
            const visibleRange = xScale.max - xScale.min;
            switch (curr) {
              case period.year:
                if (visibleRange <= 1) {
                  const curYear = dataYearly.labels[xScale.min];
                  const start = dataMonthly.labels.indexOf(`1/${curYear}`);
                  const end = start + 11;
                  updatePosition(setPositon, start, end);
                  setCurr(period.month);
                }
                break;
              case period.month:
                if (visibleRange <= 1) {
                  const curMonth = dataMonthly.labels[xScale.min];
                  const start = dataDaily.labels.indexOf(`1/${curMonth}`);
                  const end = start + 31;
                  updatePosition(setPositon, start, end);
                  setCurr(period.day);
                } else if (visibleRange >= 12) {
                  setCurr(period.year);
                }
                break;
              case period.day:
                if (visibleRange >= 31) {
                  setCurr(period.month);
                }
                break;
            }
          },
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
          // tension: 0.1,
        },
      ],
    });
  }

  return (
    <div className="chart">
      <Line data={data} options={options} />
    </div>
  );
}

export default StockInfor;

function updatePosition(setPositon, min, max) {
  setPositon({
    min: min,
    max: max,
  });
}

// Hàm tổng hợp dữ liệu theo năm
const aggregateByYear = (data) => {
  const yearlyData = {};
  data.forEach(({ tradingDate, close }) => {
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
  data.forEach(({ tradingDate, close }) => {
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
    labels: data.map((d) => DateFormat(d.tradingDate) + ""),
    prices: data.map((d) => d.close),
  };
};
