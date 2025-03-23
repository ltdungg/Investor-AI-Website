package com.stockai.backend.service.stock;

import com.stockai.backend.dto.response.StockInformationResponse;
import com.stockai.backend.entity.stock.StockInformation;
import com.stockai.backend.exception.AppException;
import com.stockai.backend.exception.ErrorCode;
import com.stockai.backend.mapper.StockMapper;
import com.stockai.backend.repository.stock.StockInformationRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockInformationService {
    StockMapper stockMapper;
    StockInformationRepository stockInformationRepository;

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
        calendar.add(Calendar.DATE, -2);

        return stockInformationRepository.findAllStockInformation(calendar.getTime());
    }
}
