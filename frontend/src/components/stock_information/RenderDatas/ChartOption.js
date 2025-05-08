import DateFormat from "../../../utils/DateFormat";
import NumberFormat from "../../../utils/NumberFormat";
import LINE_COLOR_ENUM from "../../../enum/LINE_COLOR_ENUM";
import { viLocale } from "./ChartConfig";

const getDateFormatByEndpoint = (endpoint) => {
  switch (endpoint) {
    case "/1-month":
      return 'dd/MM'; // Định dạng ngày/tháng
    case "/3-month":
      return 'dd/MM'; // Định dạng ngày/tháng
    case "/1-year":
      return 'MMM yyyy'; // Tháng năm (Th01 2025)
    case "/3-year":
      return 'MM/yyyy'; // Tháng/năm
    default:
      return 'MM/yyyy'; // Mặc định là tháng/năm
  }
};

// Hàm quyết định đơn vị thời gian dựa trên endpoint
const getTimeUnitByEndpoint = (endpoint) => {
  switch (endpoint) {
    case "/1-month":
      return 'day'; // Đơn vị ngày
    case "/3-month":
      return 'day'; // Đơn vị ngày
    case "/1-year":
      return 'month'; // Đơn vị tháng
    case "/3-year":
      return 'quarter'; // Đơn vị quý
    default:
      return 'year'; // Mặc định là năm
  }
};

export const getChartData = (stockDate, stockData) => {
  // Lấy giá trị trung bình từ props hoặc tính toán
  const avg = stockData[0]; // Hoặc giá trị trung bình khác

  return {
    // Không cần labels ở đây nữa vì sẽ dùng x/y values
    datasets: [{
      label: "Giá",
      // Sử dụng dạng {x, y} để dùng với TimeScale
      data: stockDate.map((date, index) => ({
        x: date,
        y: stockData[index]
      })),
      borderWidth: 2.5,
      pointRadius: (ctx) => {
        return ctx.dataIndex === ctx.dataset.data.length - 1 ? 5 : 0;
      },
      pointHoverRadius: 5,
      backgroundColor: (ctx) => {
        const idx = ctx.dataIndex;
        const lastIdx = ctx.dataset.data.length - 1;
        if (idx !== lastIdx) return "rgba(0,0,0,0)";
        const val = ctx.dataset.data[lastIdx].y;
        return val > avg ? LINE_COLOR_ENUM.GREEN : LINE_COLOR_ENUM.RED;
      },
      fill: false,
      segment: {
        borderColor: ctx => {
          return (ctx.p0.parsed.y > avg && ctx.p1.parsed.y > avg)
            ? LINE_COLOR_ENUM.GREEN
            : (ctx.p0.parsed.y < avg && ctx.p1.parsed.y < avg)
              ? LINE_COLOR_ENUM.RED
              : "orange";
        },
      },
      pointHoverBackgroundColor: (ctx) => {
        const idx = ctx.dataIndex;
        const val = ctx.dataset.data[idx].y;
        return val > avg ? LINE_COLOR_ENUM.GREEN : LINE_COLOR_ENUM.RED;
      },
    }],
  };
};

export const getChartOptions = (avg, mousePos, stockDate, stockData, endpoint) => {

  const minDate = Math.min(...stockDate);
  const maxDate = Math.max(...stockDate);

  return {
    responsive: true,
    animation: false,
    scales: {
      y: {
        beginAtZero: false,
        position: 'right'
      },
      x: {
        type: 'time',
        min: minDate,
        max: maxDate,
        time: {
          unit: getTimeUnitByEndpoint(endpoint),
          displayFormats: {
            day: "dd/MM",
            month: "MM yyyy",
            quarter: 'QQQ yyyy',
            year: 'yyyy'
          },
          tooltipFormat: 'dd/MM/yyyy',
        },
        adapters: {
          date: {
            locale: viLocale
          }
        },
        ticks: {
          source: 'data',
          autoSkip: true,
          maxRotation: 45,
          font: {
            size: 12
          }
        }
      }
    },
    interaction: {
      mode: "nearest",
      intersect: false,
      axis: "x",
    },
    plugins: {
      legend: {display: false},
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
            // Định dạng ngày trong tooltip
            const date = new Date(tooltipItems[0].parsed.x);
            // Sử dụng Intl.DateTimeFormat để định dạng ngày theo tiếng Việt
            return 'Ngày: ' + new Intl.DateTimeFormat('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            }).format(date);
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
        limits: {x: {
            min: minDate,
            max: maxDate,
            minRange: 1,
          }},
        zoom: {
          wheel: {enabled: true},
          pinch: {enabled: true},
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
            return value > avg ? LINE_COLOR_ENUM.GREEN : LINE_COLOR_ENUM.RED;
          },
          borderWidth: 0,
          xAdjust: 50,
          yAdjust: 10,
          color: 'white',
          content: [`${NumberFormat(stockData[stockData.length - 1])}`],
          font: {size: 12, weight: 'bold'},
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
  };
};

// export const getChartOptions = (avg, mousePos, stockDate, stockData, endpoint) => {
//   console.log(typeof stockDate[0])
//
//   return {
//   responsive: true,
//   animation: false,
//   scales: {
//     y: {beginAtZero: false, position: 'right'},
//     x: {display: true}
//   },
//   interaction: {
//     mode: "nearest",
//     intersect: false,
//     axis: "x",
//   },
//   plugins: {
//     legend: {display: false},
//     tooltip: {
//       enabled: true,
//       displayColors: true,
//       backgroundColor: 'rgba(0, 0, 0, 1)',
//       titleColor: 'white',
//       titleFont: {
//         weight: 'bold',
//         size: 14
//       },
//       bodyFont: {
//         size: 13
//       },
//       padding: 10,
//       borderColor: 'rgba(255, 165, 0, 1)',
//       borderWidth: 1,
//
//       callbacks: {
//         title: function (tooltipItems) {
//           return 'Ngày: ' + tooltipItems[0].label;
//         },
//         label: function (context) {
//           return 'Giá: ' + NumberFormat(context.parsed.y);
//         },
//         labelColor: function (context) {
//           const value = context.parsed.y;
//           if (value >= avg) {
//             return {
//               backgroundColor: 'rgba(0,128,0,0.7)', // Xanh lá
//               borderColor: 'rgba(0,128,0,1)',
//             };
//           } else {
//             return {
//               backgroundColor: 'rgba(255,0,0,0.7)', // Đỏ
//               borderColor: 'rgba(255,0,0,1)',
//             };
//           }
//         }
//       }
//     },
//     zoom: {
//       limits: {x: {minRange: 1}},
//       zoom: {
//         wheel: {enabled: true},
//         pinch: {enabled: true},
//         mode: "x",
//       },
//       pan: {
//         enabled: true,
//         mode: "x",
//       },
//     },
//     annotation: {
//       clip: false,
//       annotations: {
//         lastValue: {
//           type: 'label',
//           xValue: stockDate[stockDate.length - 1],
//           yValue: stockData[stockData.length - 1],
//           backgroundColor: (ctx) => {
//             const value = stockData[stockData.length - 1];
//             return value > avg ? LINE_COLOR_ENUM.GREEN : LINE_COLOR_ENUM.RED;
//           },
//           borderWidth: 0,
//           xAdjust: 50,
//           yAdjust: 10,
//           color: 'white',
//           content: [`${NumberFormat(stockData[stockData.length - 1])}`],
//           font: {size: 12, weight: 'bold'},
//           position: "end",
//           padding: 2,
//           display: true,
//         },
//         line1: {
//           type: "line",
//           yMin: avg,
//           yMax: avg,
//           borderColor: "rgb(255,165,0)",
//           borderWidth: 1.5,
//           borderDash: [5, 5],
//           label: {
//             display: true,
//             content: `${NumberFormat(avg)}`,
//             position: "end",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             color: "#fff",
//             padding: 4,
//             font: {
//               size: 12,
//               weight: "bold",
//             },
//           },
//         },
//       },
//     },
//   },
// };
// };
