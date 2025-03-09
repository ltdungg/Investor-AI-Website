package com.stockai.backend.controller;

import com.stockai.backend.dto.request.CreateUserRequest;
import com.stockai.backend.dto.response.UserResponse;
import com.stockai.backend.exception.AppException;
import com.stockai.backend.exception.ErrorCode;
import com.stockai.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor //tạo constructor với những final field hoặc có @NotNull
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Integer id) {
        UserResponse user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody @Valid CreateUserRequest createUserRequest) {
        userService.createUser(createUserRequest);

        return ResponseEntity.ok("user created");
    }
}
