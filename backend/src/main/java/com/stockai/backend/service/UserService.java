package com.stockai.backend.service;

import com.stockai.backend.dto.request.CreateUserRequest;
import com.stockai.backend.dto.response.UserResponse;
import com.stockai.backend.entity.user.User;
import com.stockai.backend.entity.user.UserRole;
import com.stockai.backend.exception.AppException;
import com.stockai.backend.exception.ErrorCode;
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
        if (user == null) {
            throw new AppException(ErrorCode.NOT_FOUND_USER);
        }
        return userMapper.userToUserResponse(user);
    }

    public Integer createUser(CreateUserRequest createUserRequest) {
        User user = userMapper.userRequestToUser(createUserRequest);
        if (userRepository.existsByEmailOrPhone(createUserRequest.getEmail(), createUserRequest.getPhone())) {
            throw new RuntimeException("User already exists");
        }

        user.setRole(UserRole.member);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user).getUserId();
    }
}
