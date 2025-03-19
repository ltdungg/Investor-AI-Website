package com.stockai.backend.repository.stock;

import com.stockai.backend.entity.stock.StockInformation;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface StockInformationRepository extends CrudRepository<StockInformation, Integer> {
//    @EntityGraph(attributePaths = {"icb1", "icb2", "icb3", "icb4"})
    Optional<StockInformation> findBySymbol(String symbol);
}
