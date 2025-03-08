package com.stockai.backend.mapper;

import com.stockai.backend.dto.response.UserResponse;
import com.stockai.backend.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse userToUserResponse(User user);
}
