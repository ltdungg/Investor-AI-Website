package com.stockai.backend.entity.stock.Enum;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FavouriteStockListMode {
    PRIVATE("private"),
    PUBLIC("public");

    private final String value;
}
