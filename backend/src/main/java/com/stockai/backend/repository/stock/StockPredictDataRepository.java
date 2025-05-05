package com.stockai.backend.repository.stock;

import com.stockai.backend.entity.stock.StockPredictData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockPredictDataRepository extends JpaRepository<StockPredictData, String> {
    @Query("SELECT p FROM StockPredictData p WHERE p.id.symbol = :symbol ORDER BY p.price")
    List<StockPredictData> findById_Symbol(@Param("symbol") String symbol);
}
