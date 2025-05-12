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
    const [financeIncomeStatement3, setFinanceIncomeStatement3] = useState(null);
    const [financeBalanceSheet3, setFinanceBalanceSheet3] = useState(null);
    const [financeCashFlow3, setFinanceCashFlow3] = useState(null);
    const filterTop3Years = (data) => {
        if (!data || data.length === 0) return [];
        const uniqueYears = [...new Set(data.map((item) => item.year))].sort((a, b) => b - a); // Lấy danh sách năm duy nhất và sắp xếp giảm dần
        const top3Years = uniqueYears.slice(0, 3); 
        return data.filter((item) => top3Years.includes(item.year)); 
    };
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
        
                getFinanceIncomeStatement(symbol).then((response) => {
                    const sortedData = response.data.sort((a, b) =>
                        a.year === b.year ? a.quarter - b.quarter : a.year - b.year
                    );
                    setFinanceIncomeStatement(sortedData);
                    setFinanceIncomeStatement3(filterTop3Years(sortedData)); 
                });
        
                getStockBalanceSheel(symbol).then((response) => {
                    const sortedData = response.data.sort((a, b) =>
                        a.year === b.year ? a.quarter - b.quarter : a.year - b.year
                    );
                    setFinanceBalanceSheet(sortedData);
                    setFinanceBalanceSheet3(filterTop3Years(sortedData)); 
                });
        
                getStockFinanceCashFlow(symbol).then((response) => {
                    const sortedData = response.data.sort((a, b) =>
                        a.year === b.year ? a.quarter - b.quarter : a.year - b.year
                    );
                    setFinanceCashFlow(sortedData);
                    setFinanceCashFlow3(filterTop3Years(sortedData)); 
                });
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
                    text: "Số tiền (Tỷ đồng)",
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
            <div className="table">
    <h2>Bảng Báo cáo Thu nhập</h2>
    <table>
        <thead>
            <tr>
                <th>Thuộc tính</th>
                {financeIncomeStatement3 &&
                    financeIncomeStatement3.map((item, index) => (
                        <th key={index}>
                            Q{item.quarter}-{item.year}
                        </th>
                    ))}
            </tr>
        </thead>
        <tbody>
            {[
                { label: "Doanh thu", key: "revenue" },
                { label: "Tăng trưởng Doanh thu ", key: "yearRevenueGrowth" },
                { label: "Tăng trưởng Doanh thu ", key: "quarterRevenueGrowth" },
                { label: "Lợi nhuận gộp", key: "grossProfit" },
                { label: "Lợi nhuận hoạt động", key: "operationProfit" },
                { label: "Thu nhập cổ đông", key: "shareHolderIncome" },
            ].map((row, rowIndex) => (
                <tr key={rowIndex}>
                    <td>{row.label}</td>
                    {financeIncomeStatement3 &&
                        financeIncomeStatement3.map((item, colIndex) => (
                            <td key={colIndex}>
                                {item[row.key] !== null && item[row.key] !== undefined
                                    ? typeof item[row.key] === "number"
                                        ? item[row.key].toLocaleString(undefined, {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                          })
                                        : item[row.key]
                                    : "-"}
                            </td>
                        ))}
                </tr>
            ))}
        </tbody>
    </table>
</div>

<div className="table">
    <h2>Bảng Dòng tiền</h2>
    <table>
        <thead>
            <tr>
                <th>Thuộc tính</th>
                {financeCashFlow3 &&
                    financeCashFlow3.map((item, index) => (
                        <th key={index}>
                            Q{item.quarter}-{item.year}
                        </th>
                    ))}
            </tr>
        </thead>
        <tbody>
            {[
                { label: "Chi phí đầu tư", key: "investCost" },
                { label: "Thu từ đầu tư", key: "fromInvest" },
                { label: "Thu từ tài chính", key: "fromFinancial" },
                { label: "Thu từ bán hàng", key: "fromSale" },
                { label: "Dòng tiền tự do", key: "freeCashFlow" },
            ].map((row, rowIndex) => (
                <tr key={rowIndex}>
                    <td>{row.label}</td>
                    {financeCashFlow3 &&
                        financeCashFlow3.map((item, colIndex) => (
                            <td key={colIndex}>
                                {item[row.key] !== null && item[row.key] !== undefined
                                    ? typeof item[row.key] === "number"
                                        ? item[row.key].toLocaleString(undefined, {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                          })
                                        : item[row.key]
                                    : "-"}
                            </td>
                        ))}
                </tr>
            ))}
        </tbody>
    </table>
</div>

<div className="table">
    <h2>Bảng Cân đối kế toán</h2>
    <table>
        <thead>
            <tr>
                <th>Thuộc tính</th>
                {financeBalanceSheet3 &&
                    financeBalanceSheet3.map((item, index) => (
                        <th key={index}>
                            Q{item.quarter}-{item.year}
                        </th>
                    ))}
            </tr>
        </thead>
        <tbody>
            {[
                { label: "Tài sản ngắn hạn", key: "shortAsset" },
                { label: "Tiền mặt", key: "cash" },
                { label: "Đầu tư ngắn hạn", key: "shortInvest" },
                { label: "Hàng tồn kho", key: "inventory" },
                { label: "Tổng tài sản", key: "asset" },
                { label: "Tổng nợ", key: "debt" },
                { label: "Vốn chủ sở hữu", key: "equity" },
            ].map((row, rowIndex) => (
                <tr key={rowIndex}>
                    <td>{row.label}</td>
                    {financeBalanceSheet3 &&
                        financeBalanceSheet3.map((item, colIndex) => (
                            <td key={colIndex}>
                                {item[row.key] !== null && item[row.key] !== undefined
                                    ? typeof item[row.key] === "number"
                                        ? item[row.key].toLocaleString(undefined, {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                          })
                                        : item[row.key]
                                    : "-"}
                            </td>
                        ))}
                </tr>
            ))}
        </tbody>
    </table>
</div>

        </div>
    );
}

export default StockFinancial;