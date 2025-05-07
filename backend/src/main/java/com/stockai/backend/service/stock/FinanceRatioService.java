package com.stockai.backend.service.stock;

import com.stockai.backend.dto.response.FinanceRatioResponse;
import com.stockai.backend.entity.stock.FinanceRatio;
import com.stockai.backend.mapper.FinanceRatioMapper;
import com.stockai.backend.repository.stock.FinanceRatioRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service("FinanceRatio")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FinanceRatioService implements QuarterlyFinancialData {
    FinanceRatioRepository financeRatioRepository;
    FinanceRatioMapper financeRatioMapper;

    @Override
    public List<?> getFinancialData(String symbol) {
        List<FinanceRatio> list = financeRatioRepository.findAllByFinanceId_Symbol(symbol);

        return list.stream()
                .map(financeRatio -> financeRatioMapper.toFinanceRatioResponse(financeRatio)).toList();

    }
}
