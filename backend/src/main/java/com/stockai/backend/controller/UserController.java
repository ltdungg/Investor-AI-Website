package com.stockai.backend.controller;

import com.stockai.backend.dto.response.UserResponse;
import com.stockai.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor //tạo constructor với những final field hoặc có @NotNull
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Api quản lý tài khoản người dùng", description = "quản lý tài khoản người dung")
public class UserController {
    private UserService userService;

    @GetMapping("")
    @Operation(summary = "lấy thông tin tài khoản người dùng", description = "lấy thông tin tài khoản người dùng")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "trả về thông tin tài khoản"),
            @ApiResponse(responseCode = "400", description = "không tìm được tài khoản người dùng")
    })
    public ResponseEntity<?> getUser(@RequestParam(required = false) Integer id) {
        if (id == null) {
            return ResponseEntity.ok(userService.getCurrentUser());
        }
        UserResponse user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }
}
