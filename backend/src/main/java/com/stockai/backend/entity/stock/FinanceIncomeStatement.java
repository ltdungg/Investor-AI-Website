package com.stockai.backend.entity.stock;

import com.stockai.backend.entity.stock.customId.FinanceId;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "finance_income_statement", schema = "stock")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FinanceIncomeStatement {
    @EmbeddedId
    FinanceId financeId;

    @OneToOne
    @MapsId("symbol")
    @JoinColumn(name = "symbol", referencedColumnName = "symbol")
    StockInformation stockInformation;

    @Column(name = "revenue")
    Integer revenue;  // Doanh thu

    @Column(name = "year_revenue_growth")
    Double yearRevenueGrowth;  // Tăng trưởng doanh thu so với cùng kỳ năm trước (%)

    @Column(name = "quarter_revenue_growth")
    Double quarterRevenueGrowth;  // Tăng trưởng doanh thu so với quý trước (%)

    @Column(name = "cost_of_good_sold")
    Integer costOfGoodSold;  // Giá vốn hàng bán

    @Column(name = "gross_profit")
    Integer grossProfit;  // Lợi nhuận gộp

    @Column(name = "operation_expense")
    Integer operationExpense;  // Chi phí hoạt động

    @Column(name = "operation_profit")
    Integer operationProfit;  // Lợi nhuận từ hoạt động kinh doanh

    @Column(name = "year_operation_profit_growth")
    Double yearOperationProfitGrowth;  // Tăng trưởng lợi nhuận hoạt động so với cùng kỳ năm trước (%)

    @Column(name = "quarter_operation_profit_growth")
    Double quarterOperationProfitGrowth;  // Tăng trưởng lợi nhuận hoạt động so với quý trước (%)

    @Column(name = "interest_expense")
    Integer interestExpense;  // Chi phí lãi vay

    @Column(name = "pre_tax_profit")
    Integer preTaxProfit;  // Lợi nhuận trước thuế

    @Column(name = "post_tax_profit")
    Integer postTaxProfit;  // Lợi nhuận sau thuế

    @Column(name = "share_holder_income")
    Integer shareHolderIncome;  // Thu nhập của cổ đông

    @Column(name = "year_share_holder_income_growth")
    Double yearShareHolderIncomeGrowth;  // Tăng trưởng thu nhập cổ đông so với cùng kỳ năm trước (%)

    @Column(name = "quarter_share_holder_income_growth")
    Double quarterShareHolderIncomeGrowth;  // Tăng trưởng thu nhập cổ đông so với quý trước (%)

    @Column(name = "ebitda")
    Double ebitda;  // EBITDA
}
