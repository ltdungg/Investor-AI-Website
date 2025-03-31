package com.stockai.backend.repository.stock;

import com.stockai.backend.entity.stock.StockPrice;
import com.stockai.backend.entity.stock.customId.StockPriceId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockPriceRepository extends CrudRepository<StockPrice, StockPriceId> {
    List<StockPrice> findAllById_Symbol(String symbol);
}
