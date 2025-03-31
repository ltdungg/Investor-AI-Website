package com.stockai.backend.service.stock;


import java.util.List;

public interface QuarterlyFinancialData {
    List<?> getFinancialData(String symbol);
}
