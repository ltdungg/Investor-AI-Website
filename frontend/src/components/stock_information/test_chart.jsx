import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import {
  Chart as ChartJS,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import Annotation from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  Annotation
);

// Đăng ký plugin annotation với Chart.js v2
// Quan trọng: Chỉ đăng ký một lần, thường là ở file gốc hoặc trước khi render chart lần đầu

const SegmentedLineChart = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // --- Dữ liệu gốc của bạn ---
    const labels = [
      2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
      2019, 2020, 2021, 2022, 2023, 2024, 2025,
    ];
    // Ước lượng dữ liệu từ hình ảnh của bạn (thay bằng dữ liệu thực tế)
    const prices = [
      9000, 4000, 4500, 8000, 12000, 18000, 32000, 33500, 39000, 60000, 75000,
      91000, 82000, 78000, 78000, 66000, 67000, 65000, 60000,
    ];
    const threshold = 9000; // Giá trị đường kẻ ngang

    // --- Tạo dữ liệu cho các segments ---
    const pricesBelow = [];
    const pricesAbove = [];

    for (let i = 0; i < prices.length; i++) {
      const currentPrice = prices[i];
      const previousPrice = i > 0 ? prices[i - 1] : null;

      // Xử lý điểm giao cắt (tùy chọn, làm cho đường liền mạch hơn)
      // Nếu điểm trước và điểm hiện tại nằm ở hai phía của ngưỡng
      if (
        previousPrice !== null &&
        ((previousPrice < threshold && currentPrice >= threshold) ||
          (previousPrice >= threshold && currentPrice < threshold))
      ) {
        // Tính toán điểm giao cắt (xấp xỉ tuyến tính)
        const x1 = labels[i - 1];
        const y1 = previousPrice;
        const x2 = labels[i];
        const y2 = currentPrice;
        // Điểm giao cắt có y = threshold
        // const intersectX = x1 + (x2 - x1) * (threshold - y1) / (y2 - y1); // Không cần thêm điểm x mới vào labels, chỉ cần giá trị y tại ngưỡng
        const intersectY = threshold;

        // Thêm điểm ngưỡng vào cả hai mảng để nối đường
        if (previousPrice < threshold) {
          // Đi từ dưới lên
          pricesBelow.push(intersectY);
          pricesAbove.push(null); // Gap ở đoạn trên
        } else {
          // Đi từ trên xuống
          pricesBelow.push(null); // Gap ở đoạn dưới
          pricesAbove.push(intersectY);
        }
        // Cần thêm một cặp null/value nữa cho điểm hiện tại *sau* điểm giao cắt
        if (currentPrice >= threshold) {
          pricesBelow.push(null);
          pricesAbove.push(currentPrice);
        } else {
          pricesBelow.push(currentPrice);
          pricesAbove.push(null);
        }
      } else {
        // Nếu không cắt qua, hoặc là điểm đầu tiên
        if (currentPrice < threshold) {
          pricesBelow.push(currentPrice);
          pricesAbove.push(null);
        } else {
          pricesBelow.push(null);
          pricesAbove.push(currentPrice);
        }
      }

      // Đơn giản hóa: Không xử lý giao cắt, chỉ dựa vào giá trị điểm
      // if (currentPrice < threshold) {
      //     pricesBelow.push(currentPrice);
      //     pricesAbove.push(null);
      // } else {
      //     pricesBelow.push(null);
      //     pricesAbove.push(currentPrice);
      // }
    }

    // --- Cấu hình dữ liệu cho Chart.js ---
    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Giá (Dưới ngưỡng)",
          data: pricesBelow, // Dữ liệu bạn đã tạo (với null)
          borderColor: "red",
          fill: false,
          tension: 0.1,
          pointRadius: 0,
          spanGaps: true, // <<< THÊM DÒNG NÀY
        },
        {
          label: "Giá (Trên ngưỡng)",
          data: pricesAbove, // Dữ liệu bạn đã tạo (với null)
          borderColor: "blue",
          fill: false,
          tension: 0.1,
          pointRadius: 0,
          spanGaps: true, // <<< THÊM DÒNG NÀY
        },
      ],
    });

    // --- Cấu hình các tùy chọn cho Chart.js ---
    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            // Cấu hình trục Y cho v2
            ticks: {
              beginAtZero: true,
              // Thêm các tùy chỉnh khác nếu cần
              max: 100000, // Giống biểu đồ gốc
            },
            gridLines: {
              // Hiện lưới ngang
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            // Cấu hình trục X cho v2
            ticks: {
              // autoSkip: true,
              // maxTicksLimit: 10
            },
            gridLines: {
              // Ẩn lưới dọc (hoặc tùy chỉnh)
              display: false,
            },
          },
        ],
      },
      // Vô hiệu hóa chú giải mặc định nếu muốn (vì có 2 datasets)
      legend: {
        display: false, // Ẩn chú giải mặc định 'Giá (Dưới ngưỡng)', 'Giá (Trên ngưỡng)'
        // Bạn có thể tạo chú giải tùy chỉnh bằng HTML nếu cần
      },
      tooltips: {
        // Tùy chỉnh tooltip để chỉ hiện một giá trị 'Giá'
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (tooltipItem, data) {
            // Tìm giá trị không null tại index này
            const valueBelow = data.datasets[0].data[tooltipItem.index];
            const valueAbove = data.datasets[1].data[tooltipItem.index];
            const value = valueBelow ?? valueAbove; // Lấy giá trị tồn tại

            if (value !== null) {
              return `Giá: ${value.toLocaleString()}`; // Định dạng số nếu cần
            }
            return null; // Không hiển thị nếu cả hai là null (không nên xảy ra)
          },
        },
      },
      // --- Thêm đường kẻ ngang bằng annotation plugin ---
      annotation: {
        annotations: [
          {
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis-0", // ID mặc định của trục Y trong v2
            value: threshold, // Giá trị của đường kẻ
            borderColor: "grey",
            borderWidth: 1,
            borderDash: [6, 6], // Tạo đường nét đứt [độ dài nét, độ dài khoảng trống]
            label: {
              // Nhãn trên đường kẻ (tùy chọn)
              enabled: false,
              // content: 'Ngưỡng',
              // position: "right",
              // yAdjust: -5
            },
          },
        ],
      },
    });
  }, []); // Chạy một lần khi component mount

  return (
    <div style={{ height: "400px", width: "800px" }}>
      {" "}
      {/* Điều chỉnh kích thước container */}
      {chartData.datasets && ( // Chỉ render khi có dữ liệu
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default SegmentedLineChart;
