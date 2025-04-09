package com.stockai.backend.controller.stock;

import com.stockai.backend.service.stock.QuarterlyFinancialData;
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
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("/finance-balance-sheet")
@Tag(name = "Bảng Cân Đối Kế Toán")
public class FinanceBalanceSheetController {
    @Autowired
    @Qualifier("FinanceBalanceSheet")
    QuarterlyFinancialData quarterlyFinancialData;

    @Operation(summary = "bảng cân đối kế toán của từng quý của các năm")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "trả về bảng cân đối kế toán của một cổ phiếu từng quý của các năm"),
            @ApiResponse(responseCode = "400", description = "không tìm thấy cổ phiếu"),
    })
    @GetMapping("/{symbol}")
    public ResponseEntity<?> getFinanceBalanceSheet(@PathVariable("symbol") String symbol) {
        return ResponseEntity.ok(quarterlyFinancialData.getFinancialData(symbol));
    }
}
