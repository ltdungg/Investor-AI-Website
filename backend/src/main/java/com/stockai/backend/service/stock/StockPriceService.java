package com.stockai.backend.service.stock;

import com.stockai.backend.entity.stock.StockPrice;
import com.stockai.backend.mapper.StockPriceMapper;
import com.stockai.backend.repository.stock.StockPriceRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service("StockPrice")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockPriceService implements QuarterlyFinancialData {
    StockPriceRepository stockPriceRepository;
    StockPriceMapper stockPriceMapper;

    @Override
    public List<?> getFinancialData(String symbol) {
        List<StockPrice> list = stockPriceRepository.findAllById_Symbol(symbol);
        return list.stream().map(item -> stockPriceMapper.toStockPriceResponse(item)).toList();
    }
}
