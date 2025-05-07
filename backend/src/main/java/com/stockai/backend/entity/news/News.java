package com.stockai.backend.entity.news;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "news", schema = "stock")
public class News {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "redirect_url")
    private String redirectUrl;

    @Column(name = "thumb")
    private String thumb;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "description")
    private String description;
}