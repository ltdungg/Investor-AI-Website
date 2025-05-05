package com.stockai.backend.mapper;

import com.stockai.backend.dto.response.PredictStockResponse;
import com.stockai.backend.entity.stock.StockPredictData;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface StockPredictMapper {
    @Mapping(target = "date", source = "id.date")
    PredictStockResponse toPredictStockResponse(StockPredictData stockPredictData);
}
