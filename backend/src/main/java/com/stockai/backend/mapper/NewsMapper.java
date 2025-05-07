package com.stockai.backend.mapper;

import com.stockai.backend.dto.response.NewsResponse;
import com.stockai.backend.entity.news.News;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NewsMapper {
    NewsResponse toNewsResponse(News news);
}