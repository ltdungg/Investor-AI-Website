package com.stockai.backend.controller.stock;

import com.stockai.backend.dto.request.AddStockToFavouriteListRequest;
import com.stockai.backend.dto.request.DeleteStocksFromFavouriteListRequest;
import com.stockai.backend.service.stock.FavouriteStockService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("/favourite/stock")
public class FavouriteStockController {
    FavouriteStockService favouriteStockService;

    @PostMapping("/add")
    public ResponseEntity<?> addStockToList(@RequestBody AddStockToFavouriteListRequest request) {
        favouriteStockService.addStocksToList(request);

        return ResponseEntity.ok("Add stocks to list successfully");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteStockFromList(@RequestBody DeleteStocksFromFavouriteListRequest request) {
        favouriteStockService.deleteStocksFromList(request);
        return ResponseEntity.ok("delete stocks from list successfully");
    }
}
