package com.stockai.backend.mapper;

import com.stockai.backend.dto.response.FinanceIncomeStatementResponse;
import com.stockai.backend.entity.stock.FinanceIncomeStatement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FinanceIncomeStatementMapper {
    @Mapping(target = "quarter", source = "financeId.quarter")
    @Mapping(target = "year", source = "financeId.year")
    FinanceIncomeStatementResponse toFinanceIncomeStatementResponse(FinanceIncomeStatement financeIncomeStatement);
}
