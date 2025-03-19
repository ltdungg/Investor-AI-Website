package com.stockai.backend.controller.stock;

import com.stockai.backend.dto.request.AddStockToFavouriteListRequest;
import com.stockai.backend.dto.request.NewFavouriteStockListRequest;
import com.stockai.backend.service.stock.FavoriteStockService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("/favourite")
public class FavouriteStockController {
    FavoriteStockService favoriteStockService;

    @GetMapping("/{authorId}")
    public ResponseEntity<?> getFavouriteStock(@PathVariable int authorId) {
        return ResponseEntity.ok().body(favoriteStockService.getFavouriteStockList(authorId));
    }

    @PostMapping
    public ResponseEntity<?> createNewFavoriteStock(@RequestBody NewFavouriteStockListRequest request) {
        favoriteStockService.createNewFavouriteStockList(request);

        return ResponseEntity.ok().body("List of favourite stocks created");
    }

    @PutMapping("/add")
    public ResponseEntity<?> addStockToList(@RequestBody AddStockToFavouriteListRequest request) {
        favoriteStockService.addStocksToList(request);

        return ResponseEntity.ok().body("add stock to list successfully");
    }

    @DeleteMapping("/delete/{listId}")
    public ResponseEntity<?> deleteFavouriteStockList(@PathVariable Long listId) {
        favoriteStockService.deleteFavouriteStockList(listId);

        return ResponseEntity.ok().body("Delete favourite stock list successfully");
    }
}
