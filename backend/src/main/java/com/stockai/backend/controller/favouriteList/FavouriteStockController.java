package com.stockai.backend.controller.favouriteList;

import com.stockai.backend.dto.request.AddStockToFavouriteListRequest;
import com.stockai.backend.dto.request.DeleteStocksFromFavouriteListRequest;
import com.stockai.backend.service.favouriteList.FavouriteStockService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("/favourite/stock")
@Tag(name = "Api quản lý các cổ phiếu trong một danh sách yêu thích")
public class FavouriteStockController {
    FavouriteStockService favouriteStockService;

    @PostMapping("/add")
    @Operation(summary = "thêm mã cổ phiếu vào danh sách yêu thích")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "thông báo đã thêm một hoặc nhiều cổ phiếu vào danh sách")
    })
    public ResponseEntity<?> addStockToList(@RequestBody AddStockToFavouriteListRequest request) {
        favouriteStockService.addStocksToList(request);

        return ResponseEntity.ok("Add stocks to list successfully");
    }

    @Operation(summary = "xóa mã cổ phiếu vào danh sách yêu thích")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "thông báo đã xóa một hoặc nhiều cổ phiếu vào danh sách")
    })
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteStockFromList(@RequestBody DeleteStocksFromFavouriteListRequest request) {
        favouriteStockService.deleteStocksFromList(request);
        return ResponseEntity.ok("delete stocks from list successfully");
    }

    @GetMapping("/{listId}")
    public ResponseEntity<?> favoriteStockInfo(@PathVariable Long listId) {
        return ResponseEntity.ok(favouriteStockService.findStocksInFavorite(listId));
    }
}
