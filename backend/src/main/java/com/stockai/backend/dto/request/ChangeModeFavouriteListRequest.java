package com.stockai.backend.dto.request;

import com.stockai.backend.entity.stock.Enum.FavouriteStockListMode;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChangeModeFavouriteListRequest {
    Long listId;
    FavouriteStockListMode mode;
}
