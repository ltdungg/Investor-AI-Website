package com.stockai.backend.utils.converter;

import com.stockai.backend.entity.stock.Enum.FavouriteStockListMode;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class FavouriteStockListModeConverter implements AttributeConverter<FavouriteStockListMode, String> {

    @Override
    public String convertToDatabaseColumn(FavouriteStockListMode favouriteStockListMode) {
        return favouriteStockListMode != null ? favouriteStockListMode.toString().toLowerCase() : null;
    }

    @Override
    public FavouriteStockListMode convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        for (FavouriteStockListMode mode : FavouriteStockListMode.values()) {
            if (mode.toString().equalsIgnoreCase(dbData)) {
                return mode;
            }
        }
        throw new IllegalArgumentException("Unknown value: " + dbData);
    }
}
