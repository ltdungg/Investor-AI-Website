import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getStockInformation from "../../utils/api/stock_api_utils/GetStockInformation.js";
import StockHeader from "./StockHeader.jsx";
import getFinanceIncomeStatement from "../../utils/api/stock_api_utils/GetFinanceIncomeStatement.js";
import getStockBalanceSheel from "../../utils/api/stock_api_utils/GetStockBalanceSheet.js";
import getStockFinanceCashFlow from "../../utils/api/stock_api_utils/GetStockFinanceCashFlow.js";
import zoomPlugin from "chartjs-plugin-zoom";
import "./StockFinancial.scss"
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);
const getLabels = (data) => data.map((item) => `Q${item.quarter}-${item.year}`);
function StockFinancial() {
    const { symbol } = useParams();
    const [stockInformation, setStockInformation] = useState(null);
    const [financeIncomeStatement, setFinanceIncomeStatement] = useState(null);
    const [financeBalanceSheet, setFinanceBalanceSheet] = useState(null);
    const [financeCashFlow, setFinanceCashFlow] = useState(null);
    const balanceSheetChartData = financeBalanceSheet
    ? {
          labels: getLabels(financeBalanceSheet),
          datasets: [
              {
                  label: "Tổng tài sản",
                  data: financeBalanceSheet.map((item) => item.asset),
                  backgroundColor: "rgba(54, 162, 235, 0.5)", // Màu xanh nhạt
                  borderColor: "rgba(54, 162, 235, 1)", // Màu xanh đậm
                  borderWidth: 1,
              },
              {
                  label: "Tổng nợ",
                  data: financeBalanceSheet.map((item) => item.debt),
                  backgroundColor: "rgba(255, 99, 132, 0.5)", // Màu đỏ nhạt
                  borderColor: "rgba(255, 99, 132, 1)", // Màu đỏ đậm
                  borderWidth: 1,
              },
              {
                  label: "Vốn chủ sở hữu",
                  data: financeBalanceSheet.map((item) => item.equity),
                  backgroundColor: "rgba(75, 192, 192, 0.5)", // Màu xanh lá nhạt
                  borderColor: "rgba(75, 192, 192, 1)", // Màu xanh lá đậm
                  borderWidth: 1,
              },
          ],
      }
    : {
          labels: [],
          datasets: [],
      };
      const cashFlowChartData = financeCashFlow
      ? {
            labels: getLabels(financeCashFlow),
            datasets: [
                {
                    label: "Từ bán hàng",
                    data: financeCashFlow.map((item) => item.fromSale),
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    
                    borderWidth: 1,
                },
                {
                    label: "Từ đầu tư",
                    data: financeCashFlow.map((item) => item.fromInvest),
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    
                    borderWidth: 1,
                },
                {
                    label: "Từ tài chính",
                    data: financeCashFlow.map((item) => item.fromFinancial),
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    
                    borderWidth: 1,
                },
                {
                    label: "Dòng tiền tự do",
                    data: financeCashFlow.map((item) => item.freeCashFlow),
                    backgroundColor: "rgba(153, 102, 255, 0.5)",
                    borderColor: "rgba(153, 102, 255, 1)",
                    
                    borderWidth: 1,
                },
            ],
        }
      : {
            labels: [],
            datasets: [],
        };
        const incomeStatementChartData = financeIncomeStatement
        ? {
              labels: getLabels(financeIncomeStatement),
              datasets: [
                  {
                      label: "Doanh thu",
                      data: financeIncomeStatement.map((item) => item.revenue),
                      backgroundColor: "rgba(75, 192, 192, 0.5)",
                      borderColor: "rgba(75, 192, 192, 1)",
                      
                      borderWidth: 1,
                  },
                  {
                      label: "Lợi nhuận gộp",
                      data: financeIncomeStatement.map((item) => item.grossProfit),
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                      borderColor: "rgba(255, 99, 132, 1)",
                      
                      borderWidth: 1,
                  },
                  {
                      label: "Lợi nhuận hoạt động",
                      data: financeIncomeStatement.map(
                          (item) => item.operationProfit
                      ),
                      backgroundColor: "rgba(54, 162, 235, 0.5)",
                      borderColor: "rgba(54, 162, 235, 1)",
                      
                      borderWidth: 1,
                  },
              ],
          }
        : {
              labels: [],
              datasets: [],
          };
    useEffect(() => {
        if (symbol) {
            getStockInformation(symbol).then((response) =>
                setStockInformation(response.data)
            );
            getFinanceIncomeStatement(symbol).then((response) =>
                setFinanceIncomeStatement(
                    response.data.sort((a, b) =>
                        a.year === b.year ? a.quarter - b.quarter : a.year - b.year
                    )
                )
            );
            getStockBalanceSheel(symbol).then((response) =>
                setFinanceBalanceSheet(
                    response.data.sort((a, b) =>
                        a.year === b.year ? a.quarter - b.quarter : a.year - b.year
                    )
                )
            );
            getStockFinanceCashFlow(symbol).then((response) =>
                setFinanceCashFlow(
                    response.data.sort((a, b) =>
                        a.year === b.year ? a.quarter - b.quarter : a.year - b.year
                    )
                )
            );
        }
    }, [symbol]);
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: "x", 
                },
                zoom: {
                    wheel: {
                        enabled: true, 
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: "x", 
                },
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: "Số tiền ($)",
                },
            },
        },
    };
    const getLatestDataRange = (data) => {
        if (!data || data.length === 0) return { min: 0, max: 0 };
        const latestIndex = data.length - 1; 
        const minIndex = Math.max(0, latestIndex - 3); 
        return { min: minIndex, max: latestIndex };
    };
    
    const { min, max } = getLatestDataRange(financeBalanceSheet);
    
    const chartOptionsWithInitialZoom = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: "x",
                },
                zoom: {
                    wheel: {
                        enabled: true, 
                    },
                    pinch: {
                        enabled: true, 
                    },
                    mode: "x", 
                },
            },
        },
        scales: {
            x: {
                min: min,
                max: max, 
            },
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: "Số tiền ($)",
                },
            },
        },
    };

    return (
        <div className="stock-detail-page">
            {stockInformation && (
                <StockHeader
                    stockInformation={stockInformation}
                    tabs={
                        <>
                            <Link to={`/stocks/${symbol}`} className="tab-link">
                                Tổng quan
                            </Link>
                            <Link
                                to={`/stocks/${symbol}/financial`}
                                className="tab-link active"
                            >
                                Số liệu tài chính
                            </Link>
                            <Link
                                to={`/stocks/${symbol}/priceHistory`}
                                className="tab-link"
                            >
                                Lịch sử giá
                            </Link>
                        </>
                    }
                />
            )}
            <div className="financial-data-section">
                <h3>Số liệu tài chính</h3>
            </div>
            <div className="app-container">
                <h1>Biểu đồ Tài chính</h1>
                <div className="charts-container">
                    <div className="chart">
                        <h2>Xu hướng Bảng cân đối kế toán</h2>
                        <div className="chart-wrapper">
                            <Bar
                                data={balanceSheetChartData}
                                options={chartOptionsWithInitialZoom}
                            />
                        </div>
                    </div>
                    <div className="chart">
                        <h2>Đóng góp Dòng tiền</h2>
                        <div className="chart-wrapper">
                            <Bar
                                data={cashFlowChartData}
                                options={chartOptionsWithInitialZoom}
                            />
                        </div>
                    </div>
                    <div className="chart">
                        <h2>Số liệu Báo cáo thu nhập</h2>
                        <div className="chart-wrapper">
                            <Bar
                                data={incomeStatementChartData}
                                options={chartOptionsWithInitialZoom}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StockFinancial;