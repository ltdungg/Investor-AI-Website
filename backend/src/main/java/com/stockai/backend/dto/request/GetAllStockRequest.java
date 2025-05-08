package com.stockai.backend.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GetAllStockRequest {
    List<String> exchange;
    List<Integer> icb;
}
