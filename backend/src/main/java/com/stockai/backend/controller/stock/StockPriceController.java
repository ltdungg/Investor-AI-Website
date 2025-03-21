package com.stockai.backend.controller.stock;

import com.stockai.backend.service.stock.QuarterlyFinancialData;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
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
public class StockPriceController {
    @Autowired
    @Qualifier("StockPrice")
    QuarterlyFinancialData quarterlyFinancialData;

    @GetMapping("/{symbol}")
    public ResponseEntity<?> getStockPrice(@PathVariable String symbol) {
        return ResponseEntity.ok(quarterlyFinancialData.getFinancialData(symbol));
    }
}
