package com.stockai.backend.dto.response;

public interface SimpleStockInformationDTO {
    String getSymbol();
    String getCompanyName();
    Integer getIcb1();
    Integer getIcb2();
    Integer getIcb3();
    Integer getIcb4();
    String getExchange();
    Double getClose();
    Double getPriceChange();
}
