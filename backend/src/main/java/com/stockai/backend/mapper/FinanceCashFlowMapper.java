package com.stockai.backend.mapper;

import com.stockai.backend.dto.response.FinanceCashFlowResponse;
import com.stockai.backend.entity.stock.FinanceCashFlow;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FinanceCashFlowMapper {
    @Mapping(target = "quarter", source = "financeId.quarter")
    @Mapping(target = "year", source = "financeId.year")
    FinanceCashFlowResponse toFinanceCashFlowResponse(FinanceCashFlow financeCashFlow);
}
