package com.stockai.backend.repository.stock;

import com.stockai.backend.entity.stock.FinanceRatio;
import com.stockai.backend.entity.stock.customId.FinanceId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinanceRatioRepository extends CrudRepository<FinanceRatio, FinanceId> {
    List<FinanceRatio> findAllByFinanceId_Symbol(String symbol);
}
