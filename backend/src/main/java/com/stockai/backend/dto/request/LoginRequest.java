package com.stockai.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequest {
    private String email;
    private String phone;
    private String password;

    public String getEmailOrPhone() {
        return (StringUtils.hasText(email)) ? email : phone;
    }
}
