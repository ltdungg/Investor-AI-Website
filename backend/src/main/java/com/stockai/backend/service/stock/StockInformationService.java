package com.stockai.backend.service.stock;

import com.stockai.backend.dto.response.FindStockResponse;
import com.stockai.backend.dto.response.StockInformationResponse;
import com.stockai.backend.entity.stock.StockInformation;
import com.stockai.backend.exception.AppException;
import com.stockai.backend.exception.ErrorCode;
import com.stockai.backend.mapper.StockMapper;
import com.stockai.backend.repository.stock.StockInformationRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockInformationService {
    final StockMapper stockMapper;
    final StockInformationRepository stockInformationRepository;
    @Value("${time.delay}")
    int delay_time;

    public StockInformationResponse getStockInformation(String symbol) {
        symbol = symbol.toUpperCase();
        StockInformation stockInformation = stockInformationRepository.findBySymbol(symbol).
                orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND_STOCK));

        StockInformationResponse stockInformationResponse =
                stockMapper.toStockInformationResponse(stockInformation);

        stockInformationResponse.setIcb1(stockInformation.getIcb1().getIcbId());
        stockInformationResponse.setIcb2(stockInformation.getIcb2().getIcbId());
        stockInformationResponse.setIcb3(stockInformation.getIcb3().getIcbId());
        stockInformationResponse.setIcb4(stockInformation.getIcb4().getIcbId());

        return stockInformationResponse;
    }

    public List<?> getAllStock() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, delay_time);

        return stockInformationRepository.findAllStockInformation(calendar.getTime());
    }

    public List<?> findStocks(String symbol) {
        List<StockInformation> symbols = stockInformationRepository.findBySymbolIsContainingIgnoreCase(symbol);
        List<FindStockResponse> response = new ArrayList<>();
        for (StockInformation stock : symbols) {
            response.add(new FindStockResponse(stock.getSymbol(), stock.getCompanyName()));
        }
        return response;
    }
}
