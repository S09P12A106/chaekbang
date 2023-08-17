package com.jsix.chaekbang.domain.auth.application;


import com.jsix.chaekbang.domain.auth.application.oidc.OAuthWithDrawHandler;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserWithDrawUseCase {

    private final UserRepository userRepository;
    private final OAuthWithDrawHandler oAuthWithDrawHandler;

    @Transactional
    public void withDraw(Long userId) {
        User user = userRepository.findById(userId)
                                  .orElseThrow(
                                          () -> new NotFoundResourceException("해당 유저를 찾을 수 없습니다"));
        userRepository.delete(user);
        oAuthWithDrawHandler.withDraw(user);
    }
}
