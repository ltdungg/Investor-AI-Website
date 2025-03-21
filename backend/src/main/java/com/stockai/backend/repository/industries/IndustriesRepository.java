package com.stockai.backend.repository.industries;

import com.stockai.backend.entity.stock.Industries;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IndustriesRepository extends CrudRepository<Industries, Integer> {
}
