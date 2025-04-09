package com.stockai.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateUserRequest {
    @NotBlank(message = "name can not be empty")
    String name;

    @Email(message = "email not valid")
    @NotBlank(message = "email can not be empty")
    String email;

    @Pattern(regexp = "^0\\d{9}$", message = "phone number not valid")
    @NotBlank(message = "phone number have not to be null")
    String phone;

    @NotBlank(message = "password have to be filled")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$",
            message = "password have to at least 8 character and include lower, upper case, number, special symbols")
    String password;
}
