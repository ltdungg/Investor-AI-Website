package com.stockai.backend.service.industries;

import com.stockai.backend.entity.stock.Industries;
import com.stockai.backend.repository.industries.IndustriesRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IndustriesService {
    IndustriesRepository industriesRepository;

    public List<Industries> getIndustries() {
        return (List<Industries>) industriesRepository.findAll();
    }
}
