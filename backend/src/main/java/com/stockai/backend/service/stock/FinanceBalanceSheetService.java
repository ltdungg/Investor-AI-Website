package com.stockai.backend.service.stock;

import com.stockai.backend.entity.stock.FinanceBalanceSheet;
import com.stockai.backend.mapper.FinanceBalanceSheetMapper;
import com.stockai.backend.repository.stock.FinanceBalanceSheetRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service("FinanceBalanceSheet")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FinanceBalanceSheetService implements QuarterlyFinancialData {
    FinanceBalanceSheetRepository financeBalanceSheetRepository;
    FinanceBalanceSheetMapper financeBalanceSheetMapper;

    @Override
    public List<?> getFinancialData(String symbol) {
        List<FinanceBalanceSheet> list =
                financeBalanceSheetRepository.findAllByFinanceId_Symbol(symbol);

        return list.stream()
                .map(item -> financeBalanceSheetMapper.toFinanceBalanceSheetResponse(item)).toList();
    }
}
