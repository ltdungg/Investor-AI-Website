package com.stockai.backend.mapper;

import com.stockai.backend.dto.response.FinanceBalanceSheetResponse;
import com.stockai.backend.entity.stock.FinanceBalanceSheet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FinanceBalanceSheetMapper {
    @Mapping(target = "quarter", source = "financeId.quarter")
    @Mapping(target = "year", source = "financeId.year")
    FinanceBalanceSheetResponse toFinanceBalanceSheetResponse(FinanceBalanceSheet financeBalanceSheet);
}
