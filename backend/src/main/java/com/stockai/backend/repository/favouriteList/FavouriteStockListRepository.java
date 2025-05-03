package com.stockai.backend.repository.favouriteList;

import com.stockai.backend.dto.response.StockInformationInFavorite;
import com.stockai.backend.entity.stock.FavouriteStockList;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface FavouriteStockListRepository extends CrudRepository<FavouriteStockList, Long> {
    FavouriteStockList findByListId(Long listId);
    List<FavouriteStockList> findByAuthor_UserId(Integer authorId);


    @Query(value = """
            SELECT new com.stockai.backend.dto.response.StockInformationInFavorite(
                   s.symbol,
                   s.companyName,
                   sp1.close,
                   cast(round((sp2.close - sp1.close) / sp1.close * 100, 2) as double))
            FROM StockInformation s
                     JOIN StockPrice sp1 ON s.symbol = sp1.id.symbol
                AND sp1.id.tradingDate = :date
                     JOIN StockPrice sp2 ON s.symbol = sp2.id.symbol
                and extract(year from sp2.id.tradingDate) = extract(year from sp1.id.tradingDate)
                and extract(month from sp2.id.tradingDate) = extract(month from sp1.id.tradingDate)
                and extract(day from sp2.id.tradingDate) = extract(day from sp1.id.tradingDate) - 1
                AND sp1.id.symbol IN :symbols
                AND s.companyName IS NOT NULL
            """)
    List<StockInformationInFavorite> findAllStockInformationIn(@Param("date") Date date, @Param("symbols") List<String> symbols);
}
