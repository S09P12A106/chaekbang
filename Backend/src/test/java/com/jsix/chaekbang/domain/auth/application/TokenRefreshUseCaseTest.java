package com.jsix.chaekbang.domain.auth.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.jsix.chaekbang.domain.auth.application.jwt.JwtProvider;
import com.jsix.chaekbang.domain.auth.dto.RefreshResponseDto;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.exception.AuthenticationFailException;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


@ExtendWith(MockitoExtension.class)
class TokenRefreshUseCaseTest {

    @Mock
    UserRepository userRepository;

    @Mock
    JwtProvider jwtProvider;

    @InjectMocks
    TokenRefreshUseCase tokenRefreshUseCase;

    @DisplayName("로그인이 안된 유저라면 예외를 반환한다.")
    @Test
    void notLoginUserThrowException() {
        //given
        String accessToken = "access";
        String refreshToken = "access";
        User user = User.builder()
                        .build();
        given(jwtProvider.getUserIdFromExpiredAccessToken(accessToken)).willReturn(1L);
        given(userRepository.findById(1L)).willReturn(Optional.of(user));

        //when then
        assertThatThrownBy(() -> tokenRefreshUseCase.refresh(accessToken, refreshToken))
                .isInstanceOf(AuthenticationFailException.class)
                .hasMessageContaining("로그인이 필요합니다.");
    }

    @DisplayName("저장된 토큰과 다른 입력값을 받으면 예외를 반환한다.")
    @Test
    void notEqualSavedTokenThrowException() {
        //given
        String accessToken = "access";
        String savedToken = "tokens";
        String notEqualRefreshToken = "eqweqwe";
        User user = User.builder()
                        .build();
        user.setRefreshToken(savedToken);

        given(jwtProvider.getUserIdFromExpiredAccessToken(accessToken)).willReturn(1L);
        given(userRepository.findById(1L)).willReturn(Optional.of(user));

        //when then
        assertThatThrownBy(() -> tokenRefreshUseCase.refresh(accessToken, notEqualRefreshToken))
                .isInstanceOf(AuthenticationFailException.class)
                .hasMessageContaining("인증 정보가 일치하지 않습니다.");
    }


    @DisplayName("리프레시 검증 성공 후 새로운 토큰을 발급한다.")
    @Test
    void refreshSuccess() {
        //given

        String accessToken = "access";
        String savedToken = "tokens";
        String newAccessToken = "newTokens";
        User user = User.builder()
                        .build();
        user.setRefreshToken(savedToken);
        given(jwtProvider.getUserIdFromExpiredAccessToken(accessToken)).willReturn(1L);
        given(userRepository.findById(1L)).willReturn(Optional.of(user));
        given(jwtProvider.generateAccessToken(user)).willReturn(newAccessToken);

        //when
        RefreshResponseDto result = tokenRefreshUseCase.refresh(accessToken, savedToken);

        //then

        assertThat(result.getAccessToken()).isEqualTo(newAccessToken);
        verify(jwtProvider, times(1)).validateRefreshToken(any());
    }
}