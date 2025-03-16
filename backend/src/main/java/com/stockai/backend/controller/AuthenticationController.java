package com.stockai.backend.controller;

import com.stockai.backend.dto.request.CreateUserRequest;
import com.stockai.backend.dto.request.LoginRequest;
import com.stockai.backend.entity.user.MyUserDetail;
import com.stockai.backend.entity.user.User;
import com.stockai.backend.service.UserService;
import com.stockai.backend.utils.JwtUtils;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationController {
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmailOrPhone(), loginRequest.getPassword()));

        return ResponseEntity.ok(jwtUtils.generateToken((MyUserDetail) authentication.getPrincipal()));
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> createUser(@RequestBody @Valid CreateUserRequest createUserRequest) {
        Integer userId = userService.createUser(createUserRequest);
        User user = User.builder().userId(userId).build();

        return ResponseEntity.ok(jwtUtils.generateToken(new MyUserDetail(user)));
    }
}
