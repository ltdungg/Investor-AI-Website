package com.stockai.backend.utils;

import com.stockai.backend.entity.stock.FavouriteStockList;
import com.stockai.backend.exception.AppException;
import com.stockai.backend.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FavouriteStockListUtils {
    AuthenticationUtils authenticationUtils;

    public void accessAbleChecker(FavouriteStockList favouriteStockList) {
        Integer userId = authenticationUtils.getPrincipal();

        if (favouriteStockList == null)
            throw new AppException(ErrorCode.NOT_FOUND_FAVOURITE_STOCK);
        if (!userId.equals(favouriteStockList.getAuthor().getUserId()))
            throw new AppException(ErrorCode.UNABLE_ACCESS_FAVOURITE_STOCK_LIST);
    }
}
