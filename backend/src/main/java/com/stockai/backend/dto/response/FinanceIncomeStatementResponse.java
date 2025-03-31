package com.stockai.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FinanceIncomeStatementResponse {
    int quarter;
    int year;
    Integer revenue;  // Doanh thu
    Double yearRevenueGrowth;  // Tăng trưởng doanh thu so với cùng kỳ năm trước (%)
    Double quarterRevenueGrowth;  // Tăng trưởng doanh thu so với quý trước (%)
    Integer costOfGoodSold;  // Giá vốn hàng bán
    Integer grossProfit;  // Lợi nhuận gộp
    Integer operationExpense;  // Chi phí hoạt động
    Integer operationProfit;  // Lợi nhuận từ hoạt động kinh doanh
    Double yearOperationProfitGrowth;  // Tăng trưởng lợi nhuận hoạt động so với cùng kỳ năm trước (%)
    Double quarterOperationProfitGrowth;  // Tăng trưởng lợi nhuận hoạt động so với quý trước (%)
    Integer interestExpense;  // Chi phí lãi vay
    Integer preTaxProfit;  // Lợi nhuận trước thuế
    Integer postTaxProfit;  // Lợi nhuận sau thuế
    Integer shareHolderIncome;  // Thu nhập của cổ đông
    Double yearShareHolderIncomeGrowth;  // Tăng trưởng thu nhập cổ đông so với cùng kỳ năm trước (%)
    Double quarterShareHolderIncomeGrowth;  // Tăng trưởng thu nhập cổ đông so với quý trước (%)
    Double ebitda;  // EBITDA
}
