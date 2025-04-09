package com.stockai.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FinanceBalanceSheetResponse {
    int quarter;
    int year;
    Integer shortAsset;
    Integer cash;
    Integer shortInvest;
    Integer shortReceivable;
    Integer inventory;
    Integer longAsset;
    Integer fixedAsset;
    Integer asset;  // Tổng tài sản
    Integer debt;  // Tổng nợ phải trả
    Integer shortDebt;  // Nợ ngắn hạn
    Integer longDebt;  // Nợ dài hạn
    Integer equity;  // Vốn chủ sở hữu
    Integer capital;  // Vốn góp của chủ sở hữu
    Integer otherDebt;  // Nợ khác
    Double unDistributedIncome;  // Lợi nhuận sau thuế chưa phân phối
    Integer minorShareHolderProfit;  // Lợi ích cổ đông thiểu số
    Integer payable;  // Phải trả người bán
}
