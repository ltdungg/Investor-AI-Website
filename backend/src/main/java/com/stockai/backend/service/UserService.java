package com.stockai.backend.service;

import com.stockai.backend.entity.User;
import com.stockai.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getUser(Integer id) {
        return userRepository.findByUserId(id);
    }
}
