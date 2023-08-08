package com.jsix.chaekbang.domain.user.infra.database;

import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.domain.user.domain.User;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

    private final JpaUserRepository jpaUserRepository;

    @Override
    public User save(User user) {
        return jpaUserRepository.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return jpaUserRepository.findById(id);
    }

    @Override
    public Optional<User> findByOauthProviderAndOauthId(OAuthProvider oauthProvider,
            String oauthId) {
        return jpaUserRepository.findByOauthProviderAndOauthId(oauthProvider, oauthId);
    }

    @Override
    public boolean existByOauthProviderAndOauthId(OAuthProvider oAuthProvider, String oauthId) {
        return jpaUserRepository.existsByOauthProviderAndOauthId(oAuthProvider, oauthId);
    }

    @Override
    public void delete(User user) {
        jpaUserRepository.delete(user);
    }
}
