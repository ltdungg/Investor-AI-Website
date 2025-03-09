package com.stockai.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    NOT_FOUND_USER(400, "User not found"),
    ;
    private final int code;
    private final String message;
}
