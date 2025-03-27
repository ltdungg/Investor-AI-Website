package com.stockai.backend.controller.industries;

import com.stockai.backend.service.industries.IndustriesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Api các loại cổ phiếu", description = "quản lý các loại cổ phiếu")
public class IndustriesController {
    IndustriesService industriesService;

    @GetMapping
    @Operation(summary = "lấy thông tin toàn bộ loại cổ phiếu")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "trả về toàn bộ thông tin của các loại cổ phiếu"),
            @ApiResponse(responseCode = "500", description = "lỗi server")
    })
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(industriesService.getIndustries());
    }
}
