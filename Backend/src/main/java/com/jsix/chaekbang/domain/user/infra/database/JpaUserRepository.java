package com.jsix.chaekbang.domain.user.infra.database;

import com.jsix.chaekbang.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaUserRepository extends JpaRepository<User, Long> {
    
}
