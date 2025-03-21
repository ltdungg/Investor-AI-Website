package com.stockai.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FinanceRatioResponse {
    int quarter;
    int year;
    Double priceToEarning;  // P/E (Hệ số giá trên thu nhập)
    Double priceToBook;  // P/B (Hệ số giá trên giá trị sổ sách)
    Double valueBeforeEbitda;  // Giá trị doanh nghiệp trên EBITDA
    Double roe;  // ROE (Tỷ suất lợi nhuận trên vốn chủ sở hữu)
    Double roa;  // ROA (Tỷ suất lợi nhuận trên tổng tài sản)
    Integer daysReceivable;  // Số ngày thu tiền bình quân
    Integer daysInventory;  // Số ngày tồn kho bình quân
    Integer daysPayable;  // Số ngày trả tiền bình quân
    Double ebitOnInterest;  // Khả năng thanh toán lãi vay
    Integer earningPerShare;  // Thu nhập trên mỗi cổ phiếu (EPS)
    Integer bookValuePerShare;  // Giá trị sổ sách trên mỗi cổ phiếu (BVPS)
    Double equityOnTotalAsset;  // Tỷ lệ vốn chủ sở hữu trên tổng tài sản
    Double equityOnLiability;  // Tỷ lệ vốn chủ sở hữu trên nợ phải trả
    Double currentPayment;  // Khả năng thanh toán hiện hành
    Double quickPayment;  // Khả năng thanh toán nhanh
    Double epsChange;  // Tỷ lệ tăng trưởng EPS so với cùng kỳ (%)
    Double ebitdaOnStock;  // Tỷ suất EBITDA trên giá cổ phiếu
    Double grossProfitMargin;  // Biên lợi nhuận gộp (%)
    Double operatingProfitMargin;  // Biên lợi nhuận hoạt động (%)
    Double postTaxMargin;  // Biên lợi nhuận sau thuế (%)
    Double debtOnEquity;  // Hệ số nợ trên vốn chủ sở hữu
    Double debtOnAsset;  // Hệ số nợ trên tổng tài sản
    Double debtOnEbitda;  // Hệ số nợ trên EBITDA
    Double shortOnLongDebt;  // Tỷ lệ nợ ngắn hạn trên nợ dài hạn
    Double assetOnEquity;  // Tỷ lệ tổng tài sản trên vốn chủ sở hữu
    Integer capitalBalance;  // Vốn điều lệ
    Double cashOnEquity;  // Tỷ lệ tiền mặt trên vốn chủ sở hữu
    Double cashOnCapitalize;  // Tỷ lệ tiền mặt trên vốn hóa
    Integer cashCirculation;  // Vòng quay tiền mặt
    Double revenueOnWorkCapital;  // Doanh thu trên vốn lưu động
    Double capexOnFixedAsset;  // Tỷ lệ CAPEX trên tài sản cố định
    Double revenueOnAsset;  // Doanh thu trên tổng tài sản
    Double postTaxOnPreTax;  // Tỷ lệ lợi nhuận sau thuế trên lợi nhuận trước thuế
    Double ebitOnRevenue;  // Tỷ lệ EBIT trên doanh thu
    Double preTaxOnEbit;  // Tỷ lệ Lợi nhuận trước thuế trên EBIT
    Double payableOnEquity;  // Tỷ lệ nợ phải trả trên vốn chủ sở hữu
    Double ebitdaOnStockChange;  // Thay đổi tỷ lệ EBITDA trên giá cổ phiếu
    Double bookValuePerShareChange;  // Thay đổi giá trị sổ sách trên mỗi cổ phiếu (%)
}
