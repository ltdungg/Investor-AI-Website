package com.stockai.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    NOT_FOUND_USER(400, "User not found"),
    NOT_FOUND_STOCK(400, "Stock not found"),
    NOT_FOUND_FAVOURITE_STOCK(400, "Favourite stock not found"),
    UNABLE_TO_DELETE_FAVOURITE_STOCK_LIST(403, "You unable to delete favourite stock list"),
    ;
    private final int code;
    private final String message;
}
