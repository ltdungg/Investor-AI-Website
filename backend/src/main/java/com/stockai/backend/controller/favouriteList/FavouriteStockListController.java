package com.stockai.backend.controller.favouriteList;

import com.stockai.backend.dto.request.ChangeModeFavouriteListRequest;
import com.stockai.backend.dto.request.NewFavouriteStockListRequest;
import com.stockai.backend.dto.request.RenameFavouriteStockRequest;
import com.stockai.backend.service.favouriteList.FavoriteStockListService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("/favourite")
@Tag(name = "Api quản lý các danh sách yêu thích")
public class FavouriteStockListController {
    FavoriteStockListService favoriteStockListService;

    @Operation(summary = "lấy thông tin của một hoặc nhiều danh sách yêu thích",
            description = """
                    - nếu truyền vào id sẽ trả về một danh sách có id đó \n
                    - nếu truyền vào mỗi author thì trả về các danh sách public của người đó hoặc cả private nếu bạn là người đó \n
                    - nếu không truyền gì thì trả về toàn bộ cổ phiếu hiện tại của bạn""")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "trả về thông tin các danh sách yêu thích"),
            @ApiResponse(responseCode = "400", description = "không tìm thấy danh sách"),
            @ApiResponse(responseCode = "401", description = "không người dùng không có quyền truy cập danh sách")
    })
    @GetMapping("")
    public ResponseEntity<?> getFavouriteStockList(
            @RequestParam(required = false, name = "id") Long id,
            @RequestParam(required = false, name = "author") Integer authorId) {
        Object body;
        if (id != null && id > 0) {
            body = favoriteStockListService.findAFavouriteStockListById(id);
        } else if (authorId != null && authorId > 0) {
            body = favoriteStockListService.getFavouriteStockLists(authorId);
        } else {
            body = favoriteStockListService.getFavouriteStockLists();
        }
        return ResponseEntity.ok(body);
    }


    @Operation(summary = "thêm một danh sách cổ phiếu yêu thích vào tài khoản")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "trả về toàn mã cổ phiếu vừa được tạo"),
            @ApiResponse(responseCode = "400", description = "không tìm thấy toài khoản nguười dùng")
    })
    @PostMapping("/")
    public ResponseEntity<?> createNewFavoriteStockList(@RequestBody NewFavouriteStockListRequest request) {
        return ResponseEntity.ok(
                favoriteStockListService.createNewFavouriteStockList(request)
        );
    }

    @Operation(summary = "đổi tên một danh sách yêu thích của người dùng")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "thông báo đổi tên thành công"),
            @ApiResponse(responseCode = "400", description = "không tìm thấy tài khoản nguười dùng"),
            @ApiResponse(responseCode = "400", description = "không tìm thấy danh sách"),
            @ApiResponse(responseCode = "401", description = "người dùng không có quyền đổi tên")
    })
    @PutMapping("/rename")
    public ResponseEntity<?> renameFavouriteList(@RequestBody RenameFavouriteStockRequest request) {
        favoriteStockListService.renameFavoriteStockList(request);

        return ResponseEntity.ok("Rename favourite list successfully");
    }

    @Operation(summary = "xóa một danh sách cổ phiếu yêu thích khỏi tài khoản")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "thông báo đã xóa thành công"),
            @ApiResponse(responseCode = "400", description = "không tìm thấy danh sách để xóa"),
            @ApiResponse(responseCode = "401", description = "người dùng không có quyền xóa")
    })
    @DeleteMapping("/delete/{listId}")
    public ResponseEntity<?> deleteFavouriteStockList(@PathVariable Long listId) {
        favoriteStockListService.deleteFavouriteStockList(listId);

        return ResponseEntity.ok("Delete favourite stock list successfully");
    }

    @Operation(summary = "thay đổi quyền truy cập một danh sách cổ phiếu yêu thích")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "thông báo đã thay đổi quyền truy cập thành công"),
            @ApiResponse(responseCode = "400", description = "không tìm thấy danh sách"),
            @ApiResponse(responseCode = "401", description = "người dùng không có quyền thay đổi quền truy cập danh sách này")
    })
    @PatchMapping("/")
    public ResponseEntity<?> changeModeFavouriteStockList(@RequestBody ChangeModeFavouriteListRequest request) {
        favoriteStockListService.changeModeFavouriteStockList(request);

        return ResponseEntity.ok("Change view mode of favourite stock list successfully");
    }
}
