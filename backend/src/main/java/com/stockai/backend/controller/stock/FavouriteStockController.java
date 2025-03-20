package com.stockai.backend.controller.stock;

import com.stockai.backend.dto.request.AddStockToFavouriteListRequest;
import com.stockai.backend.dto.request.ChangeModeFavouriteListRequest;
import com.stockai.backend.dto.request.NewFavouriteStockListRequest;
import com.stockai.backend.dto.request.RenameFavouriteStockRequest;
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

    @GetMapping("")
    public ResponseEntity<?> getFavouriteStockList(
            @RequestParam(required = false, name = "id") Long id,
            @RequestParam(required = false, name = "author") Integer authorId) {
        Object body;
        if (id != null && id > 0) {
            body = favoriteStockService.findAFavouriteStockListById(id);
        } else if (authorId != null && authorId > 0) {
            body = favoriteStockService.getFavouriteStockLists(authorId);
        } else {
            body = favoriteStockService.getFavouriteStockLists();
        }
        return ResponseEntity.ok(body);
    }

    @PostMapping("/")
    public ResponseEntity<?> createNewFavoriteStock(@RequestBody NewFavouriteStockListRequest request) {
        favoriteStockService.createNewFavouriteStockList(request);

        return ResponseEntity.ok("List of favourite stocks created");
    }

    @PutMapping("/add")
    public ResponseEntity<?> addStockToList(@RequestBody AddStockToFavouriteListRequest request) {
        favoriteStockService.addStocksToList(request);

        return ResponseEntity.ok("Add stock to list successfully");
    }

    @PutMapping("/rename")
    public ResponseEntity<?> renameFavouriteList(@RequestBody RenameFavouriteStockRequest request) {
        favoriteStockService.renameFavoriteStockList(request);

        return ResponseEntity.ok("Rename favourite list successfully");
    }

    @DeleteMapping("/delete/{listId}")
    public ResponseEntity<?> deleteFavouriteStockList(@PathVariable Long listId) {
        favoriteStockService.deleteFavouriteStockList(listId);

        return ResponseEntity.ok("Delete favourite stock list successfully");
    }

    @PatchMapping("/")
    public ResponseEntity<?> changeModeFavouriteStockList(@RequestBody ChangeModeFavouriteListRequest request) {
        favoriteStockService.changeModeFavouriteStockList(request);

        return ResponseEntity.ok("Change view mode of favourite stock list successfully");
    }
}
