package com.stockai.backend.controller.stock;

import com.stockai.backend.service.stock.StockPredictDataService;
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
@RequestMapping("/stock-predict")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockPredictDataController {
    StockPredictDataService stockPredictDataService;

    @GetMapping("/{symbol}")
    public ResponseEntity<?> getStockPredictData(@PathVariable("symbol") String symbol) {
        return ResponseEntity.ok(stockPredictDataService.getStockPredictData(symbol));
    }
}
