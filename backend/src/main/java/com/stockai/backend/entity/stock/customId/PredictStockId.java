package com.stockai.backend.entity.stock.customId;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PredictStockId {
    @Column(name = "symbol", nullable = false, updatable = false)
    String symbol;

    @Column(name = "date", nullable = false)
    Date date;
}
