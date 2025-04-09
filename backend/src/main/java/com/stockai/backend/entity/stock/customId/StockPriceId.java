package com.stockai.backend.entity.stock.customId;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockPriceId implements Serializable {
    @Column(name = "symbol", nullable = false, updatable = false)
    String symbol;

    @Column(name = "trading_date", nullable = false)
    Date tradingDate;
}
