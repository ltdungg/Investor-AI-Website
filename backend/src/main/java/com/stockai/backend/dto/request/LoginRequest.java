package com.stockai.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequest {
    @NotBlank(message = "Hãy điền email hoặc số điện thoại")
    private String emailOrPhone;
    @NotBlank(message = "Mật khẩu không được trống")
    private String password;
}
