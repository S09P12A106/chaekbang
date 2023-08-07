package com.jsix.chaekbang.domain.auth.application;


import com.jsix.chaekbang.domain.auth.application.jwt.JwtProvider;
import com.jsix.chaekbang.domain.auth.dto.OIDCLoginResponseDto;
import com.jsix.chaekbang.domain.auth.dto.request.SignInRequestDto;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DevelopLoginHelper {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Transactional
    public OIDCLoginResponseDto login(SignInRequestDto requestDto) {
        User savedUser = userRepository.findByOauthProviderAndOauthId(
                                               requestDto.getOauthProvider(), requestDto.getIdToken())
                                       .orElseThrow(() -> new NotFoundResourceException(
                                               "개발 계정을 찾을 수 없습니다."));
        String accessToken = jwtProvider.generateAccessToken(savedUser);
        String refreshToken = jwtProvider.generateRefreshToken();
        
        return OIDCLoginResponseDto.logined(accessToken, refreshToken);
    }
}
