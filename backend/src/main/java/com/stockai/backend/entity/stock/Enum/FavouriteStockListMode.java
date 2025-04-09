package com.stockai.backend.entity.stock.Enum;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum FavouriteStockListMode {
    PRIVATE,
    PUBLIC;

    @JsonCreator
    public static FavouriteStockListMode fromString(String value) {
        try {
            return FavouriteStockListMode.valueOf(value.toUpperCase()); // Chuyển chữ hoa
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid mode: " + value);
        }
    }

    @JsonValue
    public String toValue() {
        return name().toLowerCase(); // Khi serialize, trả về chữ thường
    }
}
