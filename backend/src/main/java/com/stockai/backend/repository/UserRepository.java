package com.stockai.backend.repository;

import com.stockai.backend.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUserId(Integer username);
    boolean existsByEmailOrPhone(final String email, final String phone);
}
