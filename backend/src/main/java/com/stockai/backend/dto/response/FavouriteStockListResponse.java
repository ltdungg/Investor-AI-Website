package com.stockai.backend.dto.response;

import com.stockai.backend.entity.stock.Enum.FavouriteStockListMode;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FavouriteStockListResponse {
    Long listId;
    String name;
    FavouriteStockListMode mode;
    Integer author;
    List<String> symbols;
}
