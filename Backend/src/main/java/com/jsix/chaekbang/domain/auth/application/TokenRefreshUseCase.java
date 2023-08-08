package com.jsix.chaekbang.domain.auth.application;


import com.jsix.chaekbang.domain.auth.application.jwt.JwtProvider;
import com.jsix.chaekbang.domain.auth.dto.RefreshResponseDto;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.exception.AuthenticationFailException;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TokenRefreshUseCase {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Transactional(readOnly = true)
    public RefreshResponseDto refresh(String accessToken, String refreshToken) {
        Long userId = jwtProvider.getUserIdFromExpiredAccessToken(accessToken);
        User user = userRepository.findById(userId)
                                  .orElseThrow(
                                          () -> new NotFoundResourceException("해당 유저를 찾을 수 없습니다."));
        jwtProvider.validateRefreshToken(refreshToken);

        if (!user.isEqualRefreshToken(refreshToken)) {
            throw new AuthenticationFailException("인증 정보가 일치하지 않습니다.");
        }

        String newAccessToken = jwtProvider.generateAccessToken(user);
        return new RefreshResponseDto(newAccessToken);
    }

}
