package com.stockai.backend.service;

import com.stockai.backend.entity.user.MyUserDetail;
import com.stockai.backend.entity.user.User;
import com.stockai.backend.exception.AppException;
import com.stockai.backend.exception.ErrorCode;
import com.stockai.backend.mapper.UserMapper;
import com.stockai.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmailOrPhone(username, username)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND_USER));
        return new MyUserDetail(user);
    }

    public UserDetails loadUserById(Integer id) {
        User user = userRepository.findByUserId(id);

        return new MyUserDetail(user);
    }
}
