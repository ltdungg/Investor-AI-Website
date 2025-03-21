package com.stockai.backend.entity.stock;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stockai.backend.entity.stock.Enum.Exchange;
import com.stockai.backend.entity.stock.customId.StockPriceId;
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
@Table(name = "stock_price", schema = "stock")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockPrice {
    @EmbeddedId
    StockPriceId id;

    @OneToOne
    @MapsId("symbol")
    @JoinColumn(name = "symbol", referencedColumnName = "symbol")
    @JsonIgnore
    StockInformation stockInformation;

    @Column(name = "exchange")
    @Enumerated(EnumType.STRING)
    @ColumnTransformer(write = "?::exchange_dt")
    Exchange exchange;

    @Column(name = "open")
    Double open;

    @Column(name = "high")
    Double high;

    @Column(name = "low")
    Double low;

    @Column(name = "close")
    Double close;

    @Column(name = "volume")
    Double volume;

    @Column(name = "value")
    Double value;
}
