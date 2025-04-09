package com.stockai.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FinanceCashFlowResponse {
    int quarter;
    int year;
    Integer investCost;  // Chi đầu tư
    Integer fromInvest;  // Lưu chuyển tiền thuần từ hoạt động đầu tư
    Integer fromFinancial;  // Lưu chuyển tiền thuần từ hoạt động tài chính
    Integer fromSale;  // Lưu chuyển tiền thuần từ hoạt động kinh doanh
    Double freeCashFlow;  // Dòng tiền tự do
}
