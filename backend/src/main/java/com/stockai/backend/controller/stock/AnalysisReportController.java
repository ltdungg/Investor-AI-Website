package com.stockai.backend.controller.stock;

import com.stockai.backend.service.stock.AnalysisReportService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/analysis-report")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AnalysisReportController {
    AnalysisReportService analysisReportService;

    @GetMapping("/find")
    public ResponseEntity<?> findWithKeyword(@RequestParam("keyword") String keyword) {
        return ResponseEntity.ok(analysisReportService.findByKeyword(keyword));
    }
}
