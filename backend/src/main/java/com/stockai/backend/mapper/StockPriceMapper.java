package com.stockai.backend.mapper;

import com.stockai.backend.dto.response.StockPriceResponse;
import com.stockai.backend.entity.stock.StockPrice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface StockPriceMapper {
    @Mapping(target = "tradingDate", source = "id.tradingDate")
    StockPriceResponse toStockPriceResponse(StockPrice stockPrice);
}
