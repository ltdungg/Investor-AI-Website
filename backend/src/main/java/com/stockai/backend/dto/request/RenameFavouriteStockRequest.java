package com.stockai.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RenameFavouriteStockRequest {
    @NotBlank(message = "List id is empty")
    Long listId;

    @NotBlank(message = "List name must not be empty")
    String name;
}
