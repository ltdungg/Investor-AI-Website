package com.stockai.backend.service.stock;

import com.stockai.backend.dto.request.AddStockToFavouriteListRequest;
import com.stockai.backend.dto.request.NewFavouriteStockListRequest;
import com.stockai.backend.dto.response.FavouriteStockListResponse;
import com.stockai.backend.entity.stock.Enum.FavouriteStockListMode;
import com.stockai.backend.entity.stock.FavouriteStockList;
import com.stockai.backend.entity.user.User;
import com.stockai.backend.exception.AppException;
import com.stockai.backend.exception.ErrorCode;
import com.stockai.backend.mapper.FavouriteStockListMapper;
import com.stockai.backend.repository.stock.FavouriteStockListRepository;
import com.stockai.backend.service.UserService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FavoriteStockService {
    FavouriteStockListRepository favouriteStockListRepository;
    FavouriteStockListMapper favouriteStockListMapper;
    UserService userService;

    public List<FavouriteStockListResponse> getFavouriteStockList(Integer authorId) {
        List<FavouriteStockList> favouriteList = favouriteStockListRepository.findByAuthor_UserId(authorId);

        List<FavouriteStockListResponse> favouriteStockListResponses = new ArrayList<>();
        favouriteList.forEach(list -> {
            favouriteStockListResponses.add(favouriteStockListMapper.toFavouriteStockListResponse(list));
            favouriteStockListResponses.getLast().setAuthor(list.getAuthor().getUserId());
        });

        return favouriteStockListResponses;
    }

    public void createNewFavouriteStockList(NewFavouriteStockListRequest newFavouriteStockListRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String userIdString = authentication.getPrincipal().toString();
        Integer userId = Integer.parseInt(userIdString);
        User user = userService.findUserById(userId);

        FavouriteStockList newFavouriteStockList = FavouriteStockList.builder()
                .name(newFavouriteStockListRequest.getName())
                .mode(FavouriteStockListMode.PRIVATE)
                .author(user)
                .symbols(null)
                .build();

        favouriteStockListRepository.save(newFavouriteStockList);
    }

    public void addStocksToList(AddStockToFavouriteListRequest request) {
        FavouriteStockList favouriteStockList = favouriteStockListRepository.findByListId(request.getListId());
        if (favouriteStockList == null)
            throw new AppException(ErrorCode.NOT_FOUND_FAVOURITE_STOCK);

        List<String> list = favouriteStockList.getSymbols();

//        if (list == null) {
//            list = new ArrayList<>();
//        }

        Set<String> symbols = new LinkedHashSet<>(list);
        symbols.addAll(request.getStocks());

        favouriteStockList.setSymbols(new ArrayList<>(symbols));

        favouriteStockListRepository.save(favouriteStockList);
    }

    public void deleteFavouriteStockList(Long favouriteStockListId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdString = authentication.getPrincipal().toString();
        Integer userId = Integer.parseInt(userIdString);

        FavouriteStockList favouriteStockList = favouriteStockListRepository.findByListId(favouriteStockListId);

        if (favouriteStockList == null)
            throw new AppException(ErrorCode.NOT_FOUND_FAVOURITE_STOCK);

        if (!userId.equals(favouriteStockList.getAuthor().getUserId()))
            throw new AppException(ErrorCode.UNABLE_TO_DELETE_FAVOURITE_STOCK_LIST);

        favouriteStockListRepository.delete(favouriteStockList);
    }
}
