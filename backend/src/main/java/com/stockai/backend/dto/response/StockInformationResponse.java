package com.stockai.backend.dto.response;

import com.stockai.backend.entity.stock.Enum.Exchange;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StockInformationResponse {
    String symbol;
    String companyName;
    String description;
    Integer icb1;
    Integer icb2;
    Integer icb3;
    Integer icb4;
    Exchange exchange;
    String historyDev;
    String companyPromise;
    String businessRisk;
    String keyDevelopments;
    String businessStrategies;
    String group;
}
