package com.stockai.backend.service.stock;

import com.stockai.backend.entity.stock.FinanceCashFlow;
import com.stockai.backend.mapper.FinanceCashFlowMapper;
import com.stockai.backend.repository.stock.FinanceCashFlowRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service("FinanceCashFlow")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FinanceCashFlowService implements QuarterlyFinancialData {
    FinanceCashFlowRepository financeCashFlowRepository;
    FinanceCashFlowMapper financeCashFlowMapper;

    @Override
    public List<?> getFinancialData(String symbol) {
        List<FinanceCashFlow> list = financeCashFlowRepository.findAllByFinanceId_Symbol(symbol);

        return list.stream().map(
                item -> financeCashFlowMapper.toFinanceCashFlowResponse(item)
        ).toList();
    }
}
