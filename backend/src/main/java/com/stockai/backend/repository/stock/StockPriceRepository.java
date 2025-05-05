package com.stockai.backend.repository.stock;

import com.stockai.backend.entity.stock.StockPrice;
import com.stockai.backend.entity.stock.customId.StockPriceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface StockPriceRepository extends JpaRepository<StockPrice, StockPriceId> {
    List<StockPrice> findAllById_Symbol(String symbol);

    @Query("SELECT s from StockPrice s WHERE s.id.symbol = :symbol AND s.id.tradingDate > :date ORDER BY s.id.tradingDate")
    List<StockPrice> findByIdInDate(@Param("symbol") String symbol,@Param("date") Date date);
}
