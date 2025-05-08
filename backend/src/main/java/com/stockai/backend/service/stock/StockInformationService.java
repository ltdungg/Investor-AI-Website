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
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockInformationService {
    final StockMapper stockMapper;
    final StockInformationRepository stockInformationRepository;

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
        return stockInformationRepository.findAllStockInformation();
    }

    public List<?> getAllStock(List<String> exchange, List<Integer> icb) {
        if (exchange == null) exchange = new ArrayList<>();
        if (icb == null) icb = new ArrayList<>();
        return stockInformationRepository.findAllStockInformation(exchange, icb);
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
