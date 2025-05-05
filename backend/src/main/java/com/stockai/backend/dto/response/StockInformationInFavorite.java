package com.stockai.backend.dto.response;


public interface StockInformationInFavorite {
    String getSymbol();
    String getCompanyName();
    Double getClose();
    Double getPriceChange();
}
