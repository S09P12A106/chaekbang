package com.jsix.chaekbang.domain.user.application.repository;

import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.domain.user.domain.User;
import java.util.Optional;

public interface UserRepository {

    User save(User user);

    Optional<User> findById(Long id);

    Optional<User> findByOauthProviderAndOauthId(OAuthProvider oauthProvider, String oauthId);

    boolean existByOauthProviderAndOauthId(OAuthProvider oAuthProvider, String oauthId);

    void delete(User user);
}
