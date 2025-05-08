package com.stockai.backend.repository.stock;

import com.stockai.backend.entity.stock.AnalysisReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnalysisReportRepository extends JpaRepository<AnalysisReport, Integer> {
    List<AnalysisReport> findAllBySymbol(String symbol);
    List<AnalysisReport> findAllBySymbolContaining(String keyword);
    List<AnalysisReport> findBySymbolContainingIgnoreCase(String keyword);
}
