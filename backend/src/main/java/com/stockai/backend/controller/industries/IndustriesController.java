package com.stockai.backend.controller.industries;

import com.stockai.backend.service.industries.IndustriesService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("/industries")
public class IndustriesController {
    IndustriesService industriesService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(industriesService.getIndustries());
    }
}
