import React from "react";
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
import "./stock_information.scss";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function StockInfor() {
    const data = {
        labels: ["Tháng 1", "Tháng 2", "Tháng 3"],
        datasets: [
            {
                label: "Doanh thu",
                data: [10, 20, 5],
                borderColor: "rgb(75, 192, 192)",
                // tension: 0.1,
            },
        ],
    };

    const options = {
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
                callbacks: {
                    label: (context) => {
                        return `${context.dataset.label}: ${context.raw} triệu`;
                    },
                },
            },
        },
    };

    return (
        <div className="chart">
            <Line data={data} options={options} />
        </div>
    );
}

export default StockInfor;
