import LINE_COLOR_ENUM from "../../enum/LINE_COLOR_ENUM";

export function zoomHandle(setData, data, daily) {
  setData({
    // ...data,
    labels: daily.labels,
    datasets: [
      {
        label: "Giá",
        data: daily.prices,
        borderColor: LINE_COLOR_ENUM.GREEN,
        pointRadius: 0,
        pointHoverRadius: 5, // Hiển thị điểm khi hover (tùy chọn)
        pointHoverBackgroundColor: LINE_COLOR_ENUM.GREEN, // Màu điểm khi hover
        pointHoverBorderColor: LINE_COLOR_ENUM.GREEN, // Viền điểm khi hover
        // tension: 0.1,
      },
    ],
  });
}

export function updatePosition(setPositon, min, max) {
  setPositon({
    min: min,
    max: max,
  });
}

export const zoomHandler =
  (
    curr,
    setCurr,
    period,
    dataYearly,
    dataMonthly,
    dataDaily,
    setPositon,
    setAvg
  ) =>
  ({ chart }) => {
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
          setAvg(dataMonthly.prices[start]);
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
          setAvg(dataDaily.prices[start]);
          setCurr(period.day);
        } else if (visibleRange >= 24) {
          setCurr(period.year);
          setAvg(dataMonthly.prices[0]);
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
          setAvg(dataMonthly.prices[start]);
          setCurr(period.month);
        }
        break;
    }
  };
