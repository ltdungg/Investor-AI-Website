package com.stockai.backend.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NewsResponse {
    private Integer id;
    private String title;
    private LocalDateTime date;
    private String redirectUrl;
    private String thumb;
    private String publisher;
    private String description;
}