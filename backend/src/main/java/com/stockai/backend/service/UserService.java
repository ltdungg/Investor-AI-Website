package com.stockai.backend.service;

import com.stockai.backend.dto.request.UserRequest;
import com.stockai.backend.dto.response.UserResponse;
import com.stockai.backend.entity.User;
import com.stockai.backend.entity.UserRole;
import com.stockai.backend.mapper.UserMapper;
import com.stockai.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor //tạo constructor với những final field hoặc có @NotNull
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;

    public UserResponse getUser(Integer id) {
        User user = userRepository.findByUserId(id);
        return userMapper.userToUserResponse(user);
    }

    public void createUser(UserRequest userRequest) {
        User user = userMapper.userRequestToUser(userRequest);
        if (userRepository.existsByEmailOrPhone(userRequest.getEmail(), userRequest.getPhone())) {
            throw new RuntimeException("User already exists");
        }

        user.setRole(UserRole.member);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
    }
}
