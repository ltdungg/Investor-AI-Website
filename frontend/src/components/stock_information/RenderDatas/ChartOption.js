import DateFormat from "../../../utils/DateFormat";
import NumberFormat from "../../../utils/NumberFormat";
import LINE_COLOR_ENUM from "../../../enum/LINE_COLOR_ENUM";

export const getChartData = (stockDate, stockData) => ({
  labels: stockDate.map((stock) => DateFormat(stock)),
  datasets: [
    {
      label: "Giá",
      data: stockData,
      borderColor: LINE_COLOR_ENUM.BLUE,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(255,165,0)",
      pointHoverBorderColor: LINE_COLOR_ENUM.BLUE,
      // tension: 0.5,
    },
  ],
});

export const getChartOptions = (avg, mousePos) => ({
  responsive: true,
  animation: false,
  scales: {
    y: { beginAtZero: false },
    x: { display: false },
  },
  interaction: {
    mode: "nearest",
    intersect: false,
    axis: "x",
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
    zoom: {
      limits: { x: { minRange: 1 } },
      zoom: {
        wheel: { enabled: true },
        pinch: { enabled: true },
        mode: "x",
      },
      pan: {
        enabled: true,
        mode: "x",
      },
    },
    annotation: {
      annotations: {
        line1: {
          type: "line",
          yMin: avg,
          yMax: avg,
          borderColor: "rgb(255,165,0)",
          borderWidth: 1.5,
          borderDash: [5, 5],
          label: {
            display: true,
            content: `${NumberFormat(avg)}`,
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
});
