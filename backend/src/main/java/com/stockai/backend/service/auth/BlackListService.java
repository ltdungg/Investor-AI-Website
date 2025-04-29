package com.stockai.backend.service.auth;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlackListService {
    @Value("${jwt.blacklist-prefix}")
    String BLACKLIST_PREFIX;

    @Autowired
    RedisTemplate<String, String> redisTemplate;

    public void blackListToken(String tokenID, Long expirySeconds) {
        String key = BLACKLIST_PREFIX + tokenID;
        redisTemplate.opsForValue().set(key, "blacklisted", expirySeconds, TimeUnit.SECONDS);
    }

    public boolean blackListed(String tokenID) {
        String key = BLACKLIST_PREFIX + tokenID;
        return redisTemplate.hasKey(key);
    }
}
