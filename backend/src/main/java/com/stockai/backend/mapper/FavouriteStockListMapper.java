package com.stockai.backend.mapper;

import com.stockai.backend.dto.response.FavouriteStockListResponse;
import com.stockai.backend.entity.stock.FavouriteStockList;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FavouriteStockListMapper {
    @Mapping(target = "author", source = "author.userId")
    FavouriteStockListResponse toFavouriteStockListResponse(FavouriteStockList favouriteStockList);
}
