package com.stockai.backend.entity.stock;

import com.stockai.backend.entity.stock.customId.PredictStockId;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "predicted_stock", schema = "stock")
public class StockPredictData {
    @EmbeddedId
    PredictStockId id;

    @Column(name = "price", nullable = false)
    Double price;

}
