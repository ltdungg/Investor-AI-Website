package com.stockai.backend.mapper;

import com.stockai.backend.dto.response.StockInformationResponse;
import com.stockai.backend.entity.stock.StockInformation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface StockMapper {
    @Mapping(target = "icb1", ignore = true)
    @Mapping(target = "icb2", ignore = true)
    @Mapping(target = "icb3", ignore = true)
    @Mapping(target = "icb4", ignore = true)
    StockInformationResponse toStockInformationResponse(StockInformation stockInformation);
}
