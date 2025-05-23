package com.stockai.backend.service.favouriteList;

import com.stockai.backend.dto.request.AddStockToFavouriteListRequest;
import com.stockai.backend.dto.request.DeleteStocksFromFavouriteListRequest;
import com.stockai.backend.dto.response.StockInformationInFavorite;
import com.stockai.backend.entity.stock.FavouriteStockList;
import com.stockai.backend.entity.stock.StockInformation;
import com.stockai.backend.repository.favouriteList.FavouriteStockListRepository;
import com.stockai.backend.repository.stock.StockInformationRepository;
import com.stockai.backend.utils.FavouriteStockListUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FavouriteStockService {
    final FavouriteStockListRepository favouriteStockListRepository;
    final FavouriteStockListUtils favouriteStockListUtils;
    final StockInformationRepository stockInformationRepository;

    public void addStocksToList(AddStockToFavouriteListRequest request) {
        FavouriteStockList favouriteStockList = favouriteStockListRepository.findByListId(request.getListId());
        favouriteStockListUtils.accessAbleChecker(favouriteStockList);

        List<StockInformation> stocks = stockInformationRepository.findBySymbolIn(request.getStocks());
        List<String> newStocks = new ArrayList<>(stocks.stream().map(StockInformation::getSymbol).toList());

        Set<String> symbols = new LinkedHashSet<>(favouriteStockList.getSymbols());
        symbols.addAll(newStocks);

        favouriteStockList.setSymbols(new ArrayList<>(symbols));

        favouriteStockListRepository.save(favouriteStockList);
    }

    public void deleteStocksFromList(DeleteStocksFromFavouriteListRequest request) {
        FavouriteStockList favouriteStockList = favouriteStockListRepository.findByListId(request.getListId());
        favouriteStockListUtils.accessAbleChecker(favouriteStockList);

        List<String> list = new ArrayList<>(favouriteStockList.getSymbols());
        list.removeAll(request.getStocks());

        favouriteStockList.setSymbols(list);
        favouriteStockListRepository.save(favouriteStockList);
    }

    public List<StockInformationInFavorite> findStocksInFavorite(Long listId) {
        FavouriteStockList favouriteStockList = favouriteStockListRepository.findByListId(listId);
        favouriteStockListUtils.accessAbleChecker(favouriteStockList);

        return favouriteStockListRepository.findAllStockInformationIn(favouriteStockList.getSymbols());
    }
}
