package com.stockai.backend.service.stock;

import com.stockai.backend.repository.stock.AnalysisReportRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AnalysisReportService {
    AnalysisReportRepository analysisReportRepository;

    public List<?> findByKeyword(String keyword) {
        return analysisReportRepository.findBySymbolContainingIgnoreCase(keyword);
    }
}
