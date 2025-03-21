package com.stockai.backend.repository.stock;

import com.stockai.backend.entity.stock.FinanceIncomeStatement;
import com.stockai.backend.entity.stock.customId.FinanceId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinanceIncomeStatementRepository extends CrudRepository<FinanceIncomeStatement, FinanceId> {
    List<FinanceIncomeStatement> findAllByFinanceId_Symbol(String symbol);
}
