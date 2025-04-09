package com.stockai.backend.repository.stock;

import com.stockai.backend.entity.stock.FinanceBalanceSheet;
import com.stockai.backend.entity.stock.customId.FinanceId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinanceBalanceSheetRepository extends CrudRepository<FinanceBalanceSheet, FinanceId> {
    List<FinanceBalanceSheet> findAllByFinanceId_Symbol (String symbol);
}
