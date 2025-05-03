package com.stockai.backend.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockInformationInFavorite {
    String symbol;
    String companyName;
    Double close;
    Double priceChange;
}
