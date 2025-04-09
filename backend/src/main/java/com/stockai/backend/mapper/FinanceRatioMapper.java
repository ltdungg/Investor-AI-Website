package com.stockai.backend.mapper;

import com.stockai.backend.dto.response.FinanceRatioResponse;
import com.stockai.backend.entity.stock.FinanceRatio;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FinanceRatioMapper {
    @Mapping(target = "quarter", source = "financeId.quarter")
    @Mapping(target = "year", source = "financeId.year")
    FinanceRatioResponse toFinanceRatioResponse(FinanceRatio financeRatio);
}
