package com.stockai.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DeleteStocksFromFavouriteListRequest {
    @NotBlank(message = "List id is empty")
    Long listId;
    @NotBlank(message = "Stock is null")
    List<String> stocks;
}
