package com.jsix.chaekbang.domain.user.infra.database;

import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.domain.user.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByOauthProviderAndOauthId(OAuthProvider oauthProvider, String oauthId);

}
