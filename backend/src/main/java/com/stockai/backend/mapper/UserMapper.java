package com.stockai.backend.mapper;

import com.stockai.backend.dto.request.CreateUserRequest;
import com.stockai.backend.dto.response.UserResponse;
import com.stockai.backend.entity.user.MyUserDetail;
import com.stockai.backend.entity.user.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse userToUserResponse(User user);
    User userRequestToUser(CreateUserRequest createUserRequest);
    MyUserDetail userToMyUserDetail(User user);
}
