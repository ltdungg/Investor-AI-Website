package com.stockai.backend.repository.stock;

import com.stockai.backend.dto.response.SimpleStockInformationDTO;
import com.stockai.backend.entity.stock.StockInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StockInformationRepository extends JpaRepository<StockInformation, Integer> {
    //    @EntityGraph(attributePaths = {"icb1", "icb2", "icb3", "icb4"})
    @Query("SELECT s FROM StockInformation s WHERE s.symbol = :symbol AND s.companyName IS NOT NULL")
    Optional<StockInformation> findBySymbol(@Param("symbol") String symbol);

    @Query("SELECT s FROM StockInformation s WHERE s.symbol IN :symbols AND s.companyName IS NOT NULL")
    List<StockInformation> findBySymbolIn(@Param("symbols") List<String> symbols);

    @Query("SELECT s FROM StockInformation s WHERE LOWER(s.symbol) LIKE LOWER(CONCAT('%', :symbol, '%')) AND s.companyName IS NOT NULL ORDER BY s.symbol")
    List<StockInformation> findBySymbolIsContainingIgnoreCase(@Param("symbol") String symbol);

    @Query(value = """
    WITH sp AS (
        SELECT stockp.symbol,
               company_name,
               icb1,
               icb2,
               icb3,
               icb4,
               stocki.exchange,
               close,
               RANK() OVER (PARTITION BY stockp.symbol ORDER BY trading_date DESC) AS r
        FROM stock.stock_price stockp
        JOIN stock.stock_information stocki ON stockp.symbol = stocki.symbol
        WHERE company_name IS NOT NULL
        AND stockp.trading_date > (CURRENT_TIMESTAMP - INTERVAL '1 month')::DATE
    )
    SELECT sp1.symbol,
           sp1.company_name,
           sp1.icb1,
           sp1.icb2,
           sp1.icb3,
           sp1.icb4,
           sp1.exchange,
           sp1.close,
           round(cast((sp1.close - sp2.close) / sp2.close * 100 AS DECIMAL), 2) AS price_change
    FROM (SELECT * FROM sp WHERE r = 1) sp1
    JOIN (SELECT * FROM sp WHERE r = 2) sp2
    ON sp1.symbol = sp2.symbol
    """, nativeQuery = true)
    List<SimpleStockInformationDTO> findAllStockInformation();

    @Query(value = """
    WITH sp AS (
        SELECT stockp.symbol,
               company_name,
               icb1,
               icb2,
               icb3,
               icb4,
               stocki.exchange,
               close,
               RANK() OVER (PARTITION BY stockp.symbol ORDER BY trading_date DESC) AS r
        FROM stock.stock_price stockp
        JOIN stock.stock_information stocki ON stockp.symbol = stocki.symbol
        WHERE company_name IS NOT NULL
        AND stockp.trading_date > (CURRENT_TIMESTAMP - INTERVAL '1 month')::DATE
        AND (:exchange IS NOT NULL AND cast(stocki.exchange AS text) IN :exchange)
        AND (:icb IS NULL OR stocki.icb1 IN :icb)
    )
    SELECT sp1.symbol,
           sp1.company_name,
           sp1.icb1,
           sp1.icb2,
           sp1.icb3,
           sp1.icb4,
           sp1.exchange,
           sp1.close,
           round(cast((sp1.close - sp2.close) / sp2.close * 100 AS DECIMAL), 2) AS price_change
    FROM (SELECT * FROM sp WHERE r = 1) sp1
    JOIN (SELECT * FROM sp WHERE r = 2) sp2
    ON sp1.symbol = sp2.symbol
    LIMIT 400
    """, nativeQuery = true)
    List<SimpleStockInformationDTO> findAllStockInformation(
            @Param("exchange") List<String> exchange, @Param("icb") List<Integer> icb);
}
