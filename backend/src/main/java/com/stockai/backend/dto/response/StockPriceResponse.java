package com.stockai.backend.dto.response;

import com.stockai.backend.entity.stock.Enum.Exchange;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockPriceResponse {
    Date tradingDate;
    Exchange exchange;
    Double open;
    Double high;
    Double low;
    Double close;
    Double volume;
    Double value;
}
