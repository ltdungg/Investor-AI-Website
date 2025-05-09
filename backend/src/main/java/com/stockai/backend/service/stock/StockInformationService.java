package com.stockai.backend.service.stock;

import com.stockai.backend.dto.response.FindStockResponse;
import com.stockai.backend.dto.response.SimpleStockInformationDTO;
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
import java.util.Comparator;
import java.util.LinkedList;
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

    public List<SimpleStockInformationDTO> getAllStock() {
        return stockInformationRepository.findAllStockInformation();
    }

    public List<?> getAllStock(List<String> exchange, List<Integer> icb, Integer page) {
        if (exchange == null) exchange = new ArrayList<>();
        if (icb == null) icb = new ArrayList<>();
        return stockInformationRepository.findAllStockInformation(exchange, icb, Math.max(0, page - 1));
    }

    public Integer getPage(List<String> exchange, List<Integer> icb){
        if (exchange == null) exchange = new ArrayList<>();
        if (icb == null) icb = new ArrayList<>();
        return stockInformationRepository.getPages(exchange, icb);
    }

    public List<?> findStocks(String symbol) {
        List<StockInformation> symbols = stockInformationRepository.findBySymbolIsContainingIgnoreCase(symbol);
        List<FindStockResponse> response = new ArrayList<>();
        for (StockInformation stock : symbols) {
            response.add(new FindStockResponse(stock.getSymbol(), stock.getCompanyName()));
        }
        return response;
    }

    public List<?> topTangVaGiamGia() {
        List<SimpleStockInformationDTO> list = getAllStock();
        list.sort(Comparator.comparing(SimpleStockInformationDTO::getPriceChange));

        int limit = 5;
        List<SimpleStockInformationDTO> response = new LinkedList<>();
        for (int i = 0; i < Math.min(limit, list.size()); i++) {
            response.addFirst(list.get(i));
            response.addLast(list.get(list.size() - 1 - i));
        }

        return  response;
    }
}
