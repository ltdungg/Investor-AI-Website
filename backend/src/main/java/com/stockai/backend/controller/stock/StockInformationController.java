package com.stockai.backend.controller.stock;

import com.stockai.backend.service.stock.StockInformationService;
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
public class StockInformationController {
    StockInformationService stockInformationService;

    @GetMapping("/{symbol}")
    public ResponseEntity<?> getStockInformation(@PathVariable("symbol") String id) {
        return ResponseEntity.ok(stockInformationService.getStockInformation(id));
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllStockInformation() {
        return ResponseEntity.ok(stockInformationService.getAllStock());
    }
}
