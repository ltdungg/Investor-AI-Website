package com.stockai.backend.service.stock;

import com.stockai.backend.entity.stock.StockPredictData;
import com.stockai.backend.exception.AppException;
import com.stockai.backend.exception.ErrorCode;
import com.stockai.backend.mapper.StockPredictMapper;
import com.stockai.backend.repository.stock.StockPredictDataRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockPredictDataService {
    StockPredictDataRepository stockPredictDataRepository;
    StockPredictMapper stockPredictMapper;

    public List<?> getStockPredictData(String symbol) {
        symbol = symbol.toUpperCase();
        List<StockPredictData> stockPredictData = stockPredictDataRepository.findById_Symbol(symbol);
        if (stockPredictData == null) {
            throw new AppException(ErrorCode.NOT_FOUND_STOCK);
        }
        return stockPredictData.stream().map(
                item -> stockPredictMapper.toPredictStockResponse(item)).toList();
    }
}
