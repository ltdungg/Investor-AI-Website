package com.stockai.backend.utils;

import com.stockai.backend.entity.user.MyUserDetail;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Slf4j
@Component
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtUtils {
    @Value("${jwt.signedKey}")
    String signedKey;
    @Value("${jwt.expiration}")
    long expiration;

    private SecretKey key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(signedKey));
    }

    public String generateToken(MyUserDetail myUserDetail) {
        return Jwts.builder()
                .subject(myUserDetail.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + expiration))
                .signWith(key())
                .compact();
    }

    public Claims getPayload(String token) {
        Claims claims = null;
        try {
            claims = Jwts.parser().verifyWith(key()).build().parseSignedClaims(token).getPayload();
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
        }

        return claims;
    }
}
