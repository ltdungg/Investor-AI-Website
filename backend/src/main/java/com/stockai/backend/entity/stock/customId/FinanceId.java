package com.stockai.backend.entity.stock.customId;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FinanceId implements Serializable {
    @Column(name = "symbol", nullable = false)
    String symbol;

    @Column(name = "quarter", nullable = false)
    int quarter;

    @Column(name = "year", nullable = false)
    int year;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        FinanceId that = (FinanceId) obj;
        return Objects.equals(symbol, that.symbol) &&
                Objects.equals(quarter, that.quarter) &&
                Objects.equals(year, that.year);
    }

    @Override
    public int hashCode() {
        return Objects.hash(symbol, quarter, year);
    }
}
