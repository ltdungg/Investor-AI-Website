package com.stockai.backend.service.auth;

import com.stockai.backend.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Log4j2
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LogoutService {
    BlackListService blackListService;
    JwtUtils jwtUtils;

    public void logout(String token) {
        Claims claims = jwtUtils.getPayload(token);
        if (claims != null) {
            blackListService.blackListToken(claims.getId(), claims.getExpiration().getTime());
        }
    }
}
