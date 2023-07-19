package com.jsix.chaekbang.domain.user.application.repository;

import com.jsix.chaekbang.domain.user.domain.User;

import java.util.Optional;

public interface UserRepository {
    User save(User user);

    Optional<User> findById(Long id);
}
