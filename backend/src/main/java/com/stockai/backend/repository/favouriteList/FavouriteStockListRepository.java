package com.stockai.backend.repository.favouriteList;

import com.stockai.backend.entity.stock.FavouriteStockList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouriteStockListRepository extends CrudRepository<FavouriteStockList, Long> {
    FavouriteStockList findByListId(Long listId);
    List<FavouriteStockList> findByAuthor_UserId(Integer authorId);
}
