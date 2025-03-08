package com.stockai.backend.service;

import com.stockai.backend.dto.response.UserResponse;
import com.stockai.backend.entity.User;
import com.stockai.backend.mapper.UserMapper;
import com.stockai.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor //tạo constructor với những final field hoặc có @NotNull
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;

    public UserResponse getUser(Integer id) {
        User user = userRepository.findByUserId(id);
        return userMapper.userToUserResponse(user);
    }
}
