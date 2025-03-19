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
@Table(name = "finance_ratio", schema = "stock")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FinanceRatio {
    @EmbeddedId
    FinanceId financeId;

    @OneToOne
    @MapsId("symbol")
    @JoinColumn(name = "symbol", referencedColumnName = "symbol")
    StockInformation stockInformation;

    @Column(name = "price_to_earning")
    private double priceToEarning;  // P/E (Hệ số giá trên thu nhập)

    @Column(name = "price_to_book")
    private double priceToBook;  // P/B (Hệ số giá trên giá trị sổ sách)

    @Column(name = "value_before_ebitda")
    private double valueBeforeEbitda;  // Giá trị doanh nghiệp trên EBITDA

    @Column(name = "roe")
    private double roe;  // ROE (Tỷ suất lợi nhuận trên vốn chủ sở hữu)

    @Column(name = "roa")
    private double roa;  // ROA (Tỷ suất lợi nhuận trên tổng tài sản)

    @Column(name = "days_receivable")
    private int daysReceivable;  // Số ngày thu tiền bình quân

    @Column(name = "days_inventory")
    private int daysInventory;  // Số ngày tồn kho bình quân

    @Column(name = "days_payable")
    private int daysPayable;  // Số ngày trả tiền bình quân

    @Column(name = "ebit_on_interest")
    private double ebitOnInterest;  // Khả năng thanh toán lãi vay

    @Column(name = "earning_per_share")
    private int earningPerShare;  // Thu nhập trên mỗi cổ phiếu (EPS)

    @Column(name = "book_value_per_share")
    private int bookValuePerShare;  // Giá trị sổ sách trên mỗi cổ phiếu (BVPS)

    @Column(name = "equity_on_total_asset")
    private double equityOnTotalAsset;  // Tỷ lệ vốn chủ sở hữu trên tổng tài sản

    @Column(name = "equity_on_liability")
    private double equityOnLiability;  // Tỷ lệ vốn chủ sở hữu trên nợ phải trả

    @Column(name = "current_payment")
    private double currentPayment;  // Khả năng thanh toán hiện hành

    @Column(name = "quick_payment")
    private double quickPayment;  // Khả năng thanh toán nhanh

    @Column(name = "eps_change")
    private double epsChange;  // Tỷ lệ tăng trưởng EPS so với cùng kỳ (%)

    @Column(name = "ebitda_on_stock")
    private double ebitdaOnStock;  // Tỷ suất EBITDA trên giá cổ phiếu

    @Column(name = "gross_profit_margin")
    private double grossProfitMargin;  // Biên lợi nhuận gộp (%)

    @Column(name = "operating_profit_margin")
    private double operatingProfitMargin;  // Biên lợi nhuận hoạt động (%)

    @Column(name = "post_tax_margin")
    private double postTaxMargin;  // Biên lợi nhuận sau thuế (%)

    @Column(name = "debt_on_equity")
    private double debtOnEquity;  // Hệ số nợ trên vốn chủ sở hữu

    @Column(name = "debt_on_asset")
    private double debtOnAsset;  // Hệ số nợ trên tổng tài sản

    @Column(name = "debt_on_ebitda")
    private double debtOnEbitda;  // Hệ số nợ trên EBITDA

    @Column(name = "short_on_long_debt")
    private double shortOnLongDebt;  // Tỷ lệ nợ ngắn hạn trên nợ dài hạn

    @Column(name = "asset_on_equity")
    private double assetOnEquity;  // Tỷ lệ tổng tài sản trên vốn chủ sở hữu

    @Column(name = "capital_balance")
    private int capitalBalance;  // Vốn điều lệ

    @Column(name = "cash_on_equity")
    private double cashOnEquity;  // Tỷ lệ tiền mặt trên vốn chủ sở hữu

    @Column(name = "cash_on_capitalize")
    private double cashOnCapitalize;  // Tỷ lệ tiền mặt trên vốn hóa

    @Column(name = "cash_circulation")
    private int cashCirculation;  // Vòng quay tiền mặt

    @Column(name = "revenue_on_work_capital")
    private double revenueOnWorkCapital;  // Doanh thu trên vốn lưu động

    @Column(name = "capex_on_fixed_asset")
    private double capexOnFixedAsset;  // Tỷ lệ CAPEX trên tài sản cố định

    @Column(name = "revenue_on_asset")
    private double revenueOnAsset;  // Doanh thu trên tổng tài sản

    @Column(name = "post_tax_on_pre_tax")
    private double postTaxOnPreTax;  // Tỷ lệ lợi nhuận sau thuế trên lợi nhuận trước thuế

    @Column(name = "ebit_on_revenue")
    private double ebitOnRevenue;  // Tỷ lệ EBIT trên doanh thu

    @Column(name = "pre_tax_on_ebit")
    private double preTaxOnEbit;  // Tỷ lệ Lợi nhuận trước thuế trên EBIT

    @Column(name = "payable_on_equity")
    private double payableOnEquity;  // Tỷ lệ nợ phải trả trên vốn chủ sở hữu

    @Column(name = "ebitda_on_stock_change")
    private double ebitdaOnStockChange;  // Thay đổi tỷ lệ EBITDA trên giá cổ phiếu

    @Column(name = "book_value_per_share_change")
    private double bookValuePerShareChange;  // Thay đổi giá trị sổ sách trên mỗi cổ phiếu (%)
}
