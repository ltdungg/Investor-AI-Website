import DateFormat from "../../../utils/DateFormat";
import NumberFormat from "../../../utils/NumberFormat";
import LINE_COLOR_ENUM from "../../../enum/LINE_COLOR_ENUM";

// Trong ChartOption.js
export const getChartData = (stockDate, stockData) => {
  // Lấy giá trị trung bình từ props hoặc tính toán
  const avg = stockData[0]; // Hoặc giá trị trung bình khác

  return {
    labels: stockDate.map((stock) => DateFormat(stock)),
    datasets: [
      {
        label: "Giá",
        data: stockData,
        // borderColor: LINE_COLOR_ENUM.BLUE,
        borderWidth: 2.5,
        pointRadius: (ctx) => {
          return ctx.dataIndex === ctx.dataset.data.length - 1 ? 5 : 0;
          },

        pointHoverRadius: 5,
        backgroundColor: (ctx) => {
            const idx = ctx.dataIndex;
            const lastIdx = ctx.dataset.data.length - 1;
            if (idx !== lastIdx) return "rgba(0,0,0,0)";
            const val = ctx.dataset.data[lastIdx];
            return val > avg ? LINE_COLOR_ENUM.GREEN : LINE_COLOR_ENUM.RED;
      } , // Để có thể dùng gradient
        fill: false, // Không fill mặc định
        segment: {
          borderColor: ctx => {
            return (ctx.p0.parsed.y > avg && ctx.p1.parsed.y > avg)
            ? LINE_COLOR_ENUM.GREEN
            : (ctx.p0.parsed.y < avg && ctx.p1.parsed.y < avg)
            ? LINE_COLOR_ENUM.RED
            : "orange";
          },
          backgroundColor: ctx => {
            if (ctx.p1.parsed.y < avg) {
              return LINE_COLOR_ENUM.GREEN; // Xanh lá
            }
            return LINE_COLOR_ENUM.RED; // Đỏ
          }
        },
        pointHoverBackgroundColor: (ctx) => {
          const idx = ctx.dataIndex;
          const val = ctx.dataset.data[idx];
          return val > avg ? LINE_COLOR_ENUM.GREEN : LINE_COLOR_ENUM.RED;
        },
        // pointHoverBorderColor: LINE_COLOR_ENUM.BLUE,
      }
    ],
  };
};


export const getChartOptions = (avg, mousePos, stockDate, stockData, endpoint) => ({
  responsive: true,
  animation: false,
  scales: {
    y: { beginAtZero: false, position: 'right'},
    x: {display: true},
  },
  interaction: {
    mode: "nearest",
    intersect: false,
    axis: "x",
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      displayColors: true,
      backgroundColor: 'rgba(0, 0, 0, 1)',
      titleColor: 'white',
      titleFont: {
        weight: 'bold',
        size: 14
      },
      bodyFont: {
        size: 13
      },
      padding: 10,
      borderColor: 'rgba(255, 165, 0, 1)',
      borderWidth: 1,

      callbacks: {
        title: function(tooltipItems) {
          return 'Ngày: ' + tooltipItems[0].label;
        },
        label: function(context) {
          return 'Giá: ' + NumberFormat(context.parsed.y);
        },
        labelColor: function(context) {
        const value = context.parsed.y;
        if (value >= avg) {
          return {
            backgroundColor: 'rgba(0,128,0,0.7)', // Xanh lá
            borderColor: 'rgba(0,128,0,1)',
          };
        } else {
          return {
            backgroundColor: 'rgba(255,0,0,0.7)', // Đỏ
            borderColor: 'rgba(255,0,0,1)',
          };
        }
      }
      }
    },
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
      clip: false,
      annotations: {
        lastValue: {
          type: 'label',
          xValue: stockDate[stockDate.length - 1],
          yValue: stockData[stockData.length - 1],
          backgroundColor: (ctx) => {
            const value = stockData[stockData.length - 1];
            return value > avg ?  LINE_COLOR_ENUM.GREEN :  LINE_COLOR_ENUM.RED;
         },
          borderWidth: 0,
          xAdjust: 50,
          yAdjust: 10,
          color: 'white',
          content: [`${NumberFormat(stockData[stockData.length - 1])}`],
          font: { size: 12, weight: 'bold'},
          position: "end",
          padding: 2,
          display: true,
        },
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
