import STOCK_ENUM from "../../enum/STOCK_ENUM";
import DateFormat from "../DateFormat";

// Hàm tổng hợp dữ liệu theo năm
export const aggregateByYear = (data) => {
  const yearlyData = {};
  data.forEach((stockData) => {
    const tradingDate = stockData[STOCK_ENUM.TRADING_DATE];
    const close = stockData[STOCK_ENUM.CLOSE];
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
export const aggregateByMonth = (data) => {
  const monthlyData = {};
  data.forEach((stockData) => {
    const tradingDate = stockData[STOCK_ENUM.TRADING_DATE];
    const close = stockData[STOCK_ENUM.CLOSE];

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
export const getDailyData = (data) => {
  return {
    labels: data.map((d) => DateFormat(d[STOCK_ENUM.TRADING_DATE]) + ""),
    prices: data.map((d) => d[STOCK_ENUM.CLOSE]),
  };
};
