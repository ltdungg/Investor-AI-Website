package com.stockai.backend.controller.stock;

import com.stockai.backend.service.stock.StockInformationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/stock")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Tag(name = "Api thông tin của cổ phiếu", description = "thông tin chi tiết của các hoặc tùng cổ phiếu")
public class StockInformationController {
    StockInformationService stockInformationService;

    @Operation(summary = "lấy thông tin của từng cổ phiếu theo mã cổ phiếu")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "trả về thông tin của một loại cổ phiếu"),
            @ApiResponse(responseCode = "400", description = "không tìm thấy cổ phiếu")
    })
    @GetMapping("/{symbol}")
    public ResponseEntity<?> getStockInformation(@PathVariable("symbol") String id) {
        return ResponseEntity.ok(stockInformationService.getStockInformation(id));
    }

    @Operation(summary = "lấy thông tin cơ bản của toàn bộ các cổ phiếu")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "trả về thông tin cơ bản của tất cả các cổ phiếu")
    })
    @GetMapping("/")
    public ResponseEntity<?> getAllStockInformation() {
        return ResponseEntity.ok(stockInformationService.getAllStock());
    }
}
