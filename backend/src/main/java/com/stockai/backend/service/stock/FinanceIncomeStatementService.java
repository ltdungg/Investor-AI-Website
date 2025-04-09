package com.stockai.backend.service.stock;

import com.stockai.backend.entity.stock.FinanceIncomeStatement;
import com.stockai.backend.mapper.FinanceIncomeStatementMapper;
import com.stockai.backend.repository.stock.FinanceIncomeStatementRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service("FinanceIncomeStatement")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FinanceIncomeStatementService implements QuarterlyFinancialData {
    FinanceIncomeStatementRepository financeIncomeStatementRepository;
    FinanceIncomeStatementMapper financeIncomeStatementMapper;


    @Override
    public List<?> getFinancialData(String symbol) {
        List<FinanceIncomeStatement> list = financeIncomeStatementRepository.findAllByFinanceId_Symbol(symbol);
        return List.of(list.stream()
                .map(item -> financeIncomeStatementMapper.toFinanceIncomeStatementResponse(item)));
    }
}
