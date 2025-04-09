package com.stockai.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginRequest {
    @NotBlank(message = "Hãy điền email hoặc số điện thoại")
    String emailOrPhone;
    @NotBlank(message = "Mật khẩu không được trống")
    String password;
}
