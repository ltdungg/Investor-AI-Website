package com.stockai.backend.service.news;

import com.stockai.backend.dto.response.NewsResponse;
import com.stockai.backend.entity.news.News;
import com.stockai.backend.mapper.NewsMapper;
import com.stockai.backend.repository.news.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsService {
    private final NewsRepository newsRepository;
    private final NewsMapper newsMapper;

    public List<?> getAllNews() {
        List<News> newsList = newsRepository.findAll();
        return newsList.stream()
                .map(newsMapper::toNewsResponse)
                .collect(Collectors.toList());
    }
}