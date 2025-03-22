package com.stockai.backend.controller.stock;

import com.stockai.backend.service.stock.QuarterlyFinancialData;
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
@RequestMapping("/finance-ratio")
public class FinanceRatioController {
    @Autowired
    @Qualifier("FinanceRatio")
    QuarterlyFinancialData quarterlyFinancialData;

    @GetMapping("/{symbol}")
    public ResponseEntity<?> financeRatio(@PathVariable String symbol) {
        return ResponseEntity.ok(quarterlyFinancialData.getFinancialData(symbol));
    }
}
