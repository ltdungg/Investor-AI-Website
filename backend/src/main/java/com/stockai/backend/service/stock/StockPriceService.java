package com.stockai.backend.service.stock;

import com.stockai.backend.entity.stock.StockPrice;
import com.stockai.backend.exception.AppException;
import com.stockai.backend.exception.ErrorCode;
import com.stockai.backend.mapper.StockPriceMapper;
import com.stockai.backend.repository.stock.StockPriceRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
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
        List<StockPrice> list = stockPriceRepository.findAllById_Symbol(symbol.toUpperCase());
        if (list == null || list.isEmpty())
            throw new AppException(ErrorCode.NOT_FOUND_STOCK);
        return list.stream().map(item -> stockPriceMapper.toStockPriceResponse(item)).toList();
    }

    public List<?> getFinancialDataIn1Month(String symbol) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -1);

        return getFinancialDataByDate(symbol, calendar.getTime());
    }

    public List<?> getFinancialDataIn3Month(String symbol) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -3);

        return getFinancialDataByDate(symbol, calendar.getTime());
    }

    public List<?> getFinancialDataIn1Year(String symbol) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.YEAR, -1);

        return getFinancialDataByDate(symbol, calendar.getTime());
    }

    public List<?> getFinancialDataIn3Year(String symbol) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.YEAR, -3);

        return getFinancialDataByDate(symbol, calendar.getTime());
    }

    private List<?> getFinancialDataByDate(String symbol, Date date) {
        List<StockPrice> list = stockPriceRepository.findByIdInDate(symbol, date);
        return list.stream()
                .map(item -> stockPriceMapper.toStockPriceResponse(item)).toList();
    }
}
