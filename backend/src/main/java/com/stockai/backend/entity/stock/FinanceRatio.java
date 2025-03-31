package com.stockai.backend.entity.stock;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "finance_ratio", schema = "stock")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FinanceRatio {
    @EmbeddedId
    FinanceId financeId;

    @OneToOne
    @MapsId("symbol")
    @JoinColumn(name = "symbol", referencedColumnName = "symbol")
    @JsonIgnore
    StockInformation stockInformation;

    @Column(name = "price_to_earning")
    Double priceToEarning;  // P/E (Hệ số giá trên thu nhập)

    @Column(name = "price_to_book")
    Double priceToBook;  // P/B (Hệ số giá trên giá trị sổ sách)

    @Column(name = "value_before_ebitda")
    Double valueBeforeEbitda;  // Giá trị doanh nghiệp trên EBITDA

    @Column(name = "roe")
    Double roe;  // ROE (Tỷ suất lợi nhuận trên vốn chủ sở hữu)

    @Column(name = "roa")
    Double roa;  // ROA (Tỷ suất lợi nhuận trên tổng tài sản)

    @Column(name = "days_receivable")
    Integer daysReceivable;  // Số ngày thu tiền bình quân

    @Column(name = "days_inventory")
    Integer daysInventory;  // Số ngày tồn kho bình quân

    @Column(name = "days_payable")
    Integer daysPayable;  // Số ngày trả tiền bình quân

    @Column(name = "ebit_on_interest")
    Double ebitOnInterest;  // Khả năng thanh toán lãi vay

    @Column(name = "earning_per_share")
    Integer earningPerShare;  // Thu nhập trên mỗi cổ phiếu (EPS)

    @Column(name = "book_value_per_share")
    Integer bookValuePerShare;  // Giá trị sổ sách trên mỗi cổ phiếu (BVPS)

    @Column(name = "equity_on_total_asset")
    Double equityOnTotalAsset;  // Tỷ lệ vốn chủ sở hữu trên tổng tài sản

    @Column(name = "equity_on_liability")
    Double equityOnLiability;  // Tỷ lệ vốn chủ sở hữu trên nợ phải trả

    @Column(name = "current_payment")
    Double currentPayment;  // Khả năng thanh toán hiện hành

    @Column(name = "quick_payment")
    Double quickPayment;  // Khả năng thanh toán nhanh

    @Column(name = "eps_change")
    Double epsChange;  // Tỷ lệ tăng trưởng EPS so với cùng kỳ (%)

    @Column(name = "ebitda_on_stock")
    Double ebitdaOnStock;  // Tỷ suất EBITDA trên giá cổ phiếu

    @Column(name = "gross_profit_margin")
    Double grossProfitMargin;  // Biên lợi nhuận gộp (%)

    @Column(name = "operating_profit_margin")
    Double operatingProfitMargin;  // Biên lợi nhuận hoạt động (%)

    @Column(name = "post_tax_margin")
    Double postTaxMargin;  // Biên lợi nhuận sau thuế (%)

    @Column(name = "debt_on_equity")
    Double debtOnEquity;  // Hệ số nợ trên vốn chủ sở hữu

    @Column(name = "debt_on_asset")
    Double debtOnAsset;  // Hệ số nợ trên tổng tài sản

    @Column(name = "debt_on_ebitda")
    Double debtOnEbitda;  // Hệ số nợ trên EBITDA

    @Column(name = "short_on_long_debt")
    Double shortOnLongDebt;  // Tỷ lệ nợ ngắn hạn trên nợ dài hạn

    @Column(name = "asset_on_equity")
    Double assetOnEquity;  // Tỷ lệ tổng tài sản trên vốn chủ sở hữu

    @Column(name = "capital_balance")
    Integer capitalBalance;  // Vốn điều lệ

    @Column(name = "cash_on_equity")
    Double cashOnEquity;  // Tỷ lệ tiền mặt trên vốn chủ sở hữu

    @Column(name = "cash_on_capitalize")
    Double cashOnCapitalize;  // Tỷ lệ tiền mặt trên vốn hóa

    @Column(name = "cash_circulation")
    Integer cashCirculation;  // Vòng quay tiền mặt

    @Column(name = "revenue_on_work_capital")
    Double revenueOnWorkCapital;  // Doanh thu trên vốn lưu động

    @Column(name = "capex_on_fixed_asset")
    Double capexOnFixedAsset;  // Tỷ lệ CAPEX trên tài sản cố định

    @Column(name = "revenue_on_asset")
    Double revenueOnAsset;  // Doanh thu trên tổng tài sản

    @Column(name = "post_tax_on_pre_tax")
    Double postTaxOnPreTax;  // Tỷ lệ lợi nhuận sau thuế trên lợi nhuận trước thuế

    @Column(name = "ebit_on_revenue")
    Double ebitOnRevenue;  // Tỷ lệ EBIT trên doanh thu

    @Column(name = "pre_tax_on_ebit")
    Double preTaxOnEbit;  // Tỷ lệ Lợi nhuận trước thuế trên EBIT

    @Column(name = "payable_on_equity")
    Double payableOnEquity;  // Tỷ lệ nợ phải trả trên vốn chủ sở hữu

    @Column(name = "ebitda_on_stock_change")
    Double ebitdaOnStockChange;  // Thay đổi tỷ lệ EBITDA trên giá cổ phiếu

    @Column(name = "book_value_per_share_change")
    Double bookValuePerShareChange;  // Thay đổi giá trị sổ sách trên mỗi cổ phiếu (%)
}
