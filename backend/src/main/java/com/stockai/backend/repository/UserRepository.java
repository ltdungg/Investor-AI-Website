package com.stockai.backend.repository;

import com.stockai.backend.entity.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUserId(Integer id);
    boolean existsByEmailOrPhone(final String email, final String phone);
    Optional<User> findByEmailOrPhone(final String email, final String phone);
    User findByEmail(final String email);
    User findByPhone(final String phone);
}
