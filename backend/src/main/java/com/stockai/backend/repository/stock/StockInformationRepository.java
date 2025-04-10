package com.stockai.backend.repository.stock;

import com.stockai.backend.dto.response.SimpleStockInformationDTO;
import com.stockai.backend.entity.stock.StockInformation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface StockInformationRepository extends CrudRepository<StockInformation, Integer> {
    //    @EntityGraph(attributePaths = {"icb1", "icb2", "icb3", "icb4"})
    Optional<StockInformation> findBySymbol(String symbol);
    List<StockInformation> findBySymbolIn(List<String> symbols);

    @Query(value = """
            select new com.stockai.backend.dto.response.SimpleStockInformationDTO
            (s.symbol,
            s.companyName,
            s.icb1.icbId,
            s.icb2.icbId,
            s.icb3.icbId,
            s.icb4.icbId,
            s.exchange,
            sp1.close,
            cast(round((sp2.close - sp1.close) / sp1.close * 100, 2) as double))
            from StockInformation s
                join StockPrice sp1 on s.symbol = sp1.id.symbol and sp1.id.tradingDate = :date
                join StockPrice sp2 on s.symbol = sp2.id.symbol
                and extract(year from sp2.id.tradingDate) = extract(year from sp1.id.tradingDate)
                and extract(month from sp2.id.tradingDate) = extract(month from sp1.id.tradingDate)
                and extract(day from sp2.id.tradingDate) = extract(day from sp1.id.tradingDate) - 1
            """)
    List<SimpleStockInformationDTO> findAllStockInformation(@Param("date") Date date);
}
