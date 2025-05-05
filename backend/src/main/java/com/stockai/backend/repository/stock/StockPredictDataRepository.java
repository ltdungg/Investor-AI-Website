package com.stockai.backend.repository.stock;

import com.stockai.backend.entity.stock.StockPredictData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockPredictDataRepository extends JpaRepository<StockPredictData, String> {
    List<StockPredictData> findById_Symbol(String symbol);
}
