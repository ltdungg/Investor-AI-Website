package com.stockai.backend.repository.stock;

import com.stockai.backend.entity.stock.FinanceCashFlow;
import com.stockai.backend.entity.stock.customId.FinanceId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinanceCashFlowRepository extends CrudRepository<FinanceCashFlow, FinanceId> {
    List<FinanceCashFlow> findAllByFinanceId_Symbol (String symbol);
}
