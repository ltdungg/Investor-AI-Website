package com.stockai.backend.entity.stock;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "analysis_report", schema = "stock")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AnalysisReport {
    @Id
    @Column(name = "id")
    Integer id;

    @Column(name = "symbol", nullable = false)
    String symbol;

    @Column(name = "source")
    String source;

    @Column(name = "report_year")
    Integer reportYear;

    @Column(name = "name")
    String name;

    @Column(name = "published_at")
    Date publishedAt;

    @Column(name = "body_url")
    String bodyUrl;
}
