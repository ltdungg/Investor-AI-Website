package com.stockai.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddStockToFavouriteListRequest {
    @NotBlank(message = "List id is empty")
    Long listId;
    @NotBlank(message = "Stock is null")
    List<String> stocks;
}
