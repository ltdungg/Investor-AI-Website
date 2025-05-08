package com.stockai.backend.repository.favouriteList;

import com.stockai.backend.dto.response.StockInformationInFavorite;
import com.stockai.backend.entity.stock.FavouriteStockList;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouriteStockListRepository extends CrudRepository<FavouriteStockList, Long> {
    FavouriteStockList findByListId(Long listId);
    List<FavouriteStockList> findByAuthor_UserId(Integer authorId);


    @Query(value = """
            WITH sp AS (SELECT stockp.symbol,
                            company_name,
                             close,
                            RANK() OVER (PARTITION BY stockp.symbol ORDER BY trading_date DESC ) AS r
                     FROM stock.stock_price stockp
                              JOIN stock.stock_information stocki ON stockp.symbol = stocki.symbol
                         AND company_name IS NOT NULL
                         AND stocki.symbol IN ?1
                         AND stockp.trading_date > (CURRENT_TIMESTAMP - INTERVAL '1 month')::DATE)
            SELECT sp1.*,
                round(cast((sp1.close - sp2.close) / sp2.close * 100 AS DECIMAL), 2) AS priceChange
            FROM (SELECT * FROM sp WHERE r = 1) sp1
            JOIN (SELECT * FROM sp WHERE r = 2) sp2
            ON sp1.symbol = sp2.symbol;
            """, nativeQuery = true)
    List<StockInformationInFavorite> findAllStockInformationIn(List<String> symbols);
}
