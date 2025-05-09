import { useParams, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import getStockInformation from "../../utils/api/stock_api_utils/GetStockInformation.js";
import StockHeader from "./StockHeader.jsx";
import getFinanceIncomeStatement from "../../utils/api/stock_api_utils/GetFinanceIncomeStatement.js";
function StockFinancial() {
    const { symbol } = useParams();
    const [stockInformation, setStockInformation] = useState(null);
    // public class FinanceIncomeStatementResponse {
    //     int quarter;
    //     int year;
    //     Integer revenue;
    //     Double yearRevenueGrowth;
    //     Double quarterRevenueGrowth;
    //     Integer costOfGoodSold;
    //     Integer grossProfit;
    //     Integer operationExpense;
    //     Integer operationProfit;
    //     Double yearOperationProfitGrowth;
    //     Double quarterOperationProfitGrowth;
    //     Integer interestExpense;
    //     Integer preTaxProfit;
    //     Integer postTaxProfit;
    //     Integer shareHolderIncome;
    //     Double yearShareHolderIncomeGrowth;
    //     Double quarterShareHolderIncomeGrowth;
    //     Double ebitda;
    // }
    const [financeIncomeStatement, setFinanceIncomeStatement] = useState(null);

    useEffect(() => {
        if (symbol) {
            getStockInformation(symbol).then((response) =>
                setStockInformation(response.data)
            );
            getFinanceIncomeStatement(symbol).then((response) =>
                setFinanceIncomeStatement(response.data)
            );
        }
    }, [symbol]);
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
        </div>
    );
}

export default StockFinancial;
