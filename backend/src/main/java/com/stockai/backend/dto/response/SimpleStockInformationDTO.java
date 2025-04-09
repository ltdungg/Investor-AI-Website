package com.stockai.backend.dto.response;

import com.stockai.backend.entity.stock.Enum.Exchange;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SimpleStockInformationDTO {
    String symbol;
    String companyName;
    Integer icb1;
    Integer icb2;
    Integer icb3;
    Integer icb4;
    Exchange exchange;
    Double close;
    Double priceChange;
}
