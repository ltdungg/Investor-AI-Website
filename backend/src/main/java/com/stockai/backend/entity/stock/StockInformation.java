package com.stockai.backend.entity.stock;

import com.stockai.backend.entity.stock.Enum.Exchange;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.ColumnTransformer;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "stock_information", schema = "stock")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockInformation {
    @Id
    @Column(name = "symbol", unique = true, updatable = false, nullable = false)
    String symbol;

    @Column(name = "company_name")
    String companyName;

    @Column(name = "description")
    String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "icb1", referencedColumnName = "icb_id")
    Industries icb1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "icb2", referencedColumnName = "icb_id")
    Industries icb2;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "icb3", referencedColumnName = "icb_id")
    Industries icb3;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "icb4", referencedColumnName = "icb_id")
    Industries icb4;

    @Column(name = "exchange")
    @Enumerated(EnumType.STRING)
    @ColumnTransformer(write = "?::exchange_dt")
    Exchange exchange;

    @Column(name = "history_dev")
    String historyDev;

    @Column(name = "company_promise")
    String companyPromise;

    @Column(name = "business_risk")
    String businessRisk;

    @Column(name = "key_developments")
    String keyDevelopments;

    @Column(name = "business_strategies")
    String businessStrategies;
}
