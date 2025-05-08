package com.stockai.backend.controller.stock;

import com.stockai.backend.service.stock.StockPriceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("/stock-price")
@Tag(name = "API giá cổ phiếu", description = "quản lý giá của cổ phiếu theo từng ngày")
public class StockPriceController {
    @Autowired
    @Qualifier("StockPrice")
    StockPriceService stockPriceService;

    @Operation(summary = "lấy giá cổ phiếu theo từng trước đến nay", description = "lấy giá của từng cổ phiếu theo mã cổ phiếu")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "lấy tất cả các giá của một cổ phiếu từ đầu dến bây giờ"),
            @ApiResponse(responseCode = "400", description = "không tìm thấy cổ phiếu cần tìm")
    })
    @GetMapping("/{symbol}")
    public ResponseEntity<?> getStockPrice(@PathVariable String symbol) {
        return ResponseEntity.ok(stockPriceService.getFinancialData(symbol));
    }

    @GetMapping("/1-month/{symbol}")
    public ResponseEntity<?> getPriceStockBy1Month(@PathVariable String symbol) {
        return ResponseEntity.ok(stockPriceService.getFinancialDataIn1Month(symbol));
    }

    @GetMapping("/3-month/{symbol}")
    public ResponseEntity<?> getPriceStockBy3Month(@PathVariable String symbol) {
        return ResponseEntity.ok(stockPriceService.getFinancialDataIn3Month(symbol));
    }

    @GetMapping("/1-year/{symbol}")
    public ResponseEntity<?> getPriceStockBy1Year(@PathVariable String symbol) {
        return ResponseEntity.ok(stockPriceService.getFinancialDataIn1Year(symbol));
    }

    @GetMapping("3-year/{symbol}")
    public ResponseEntity<?> getPriceStockBy3Year(@PathVariable String symbol) {
        return ResponseEntity.ok(stockPriceService.getFinancialDataIn3Year(symbol));
    }
}
