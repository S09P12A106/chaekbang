package com.jsix.chaekbang.domain.auth.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.jsix.chaekbang.domain.auth.application.jwt.JwtProvider;
import com.jsix.chaekbang.domain.auth.application.oidc.IDTokenValidatorHandler;
import com.jsix.chaekbang.domain.auth.dto.OIDCLoginResponseDto;
import com.jsix.chaekbang.domain.auth.dto.OIDCUser;
import com.jsix.chaekbang.domain.auth.dto.request.SignInRequestDto;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.property.JwtProperty;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
class OIDCSignInUseCaseTest {

    @Mock
    UserRepository userRepository;

    @Spy
    JwtProvider jwtProvider = new JwtProvider(mockJwtProperty());

    @Mock
    IDTokenValidatorHandler idTokenValidatorHandler;

    @InjectMocks
    OIDCSignInUseCase oidcSignInUseCase;


    @DisplayName("가입이 안된 유저라면 토큰을 발급받지 않고 리턴한다.")
    @Test
    void notRegisterUserIsNotMakeToken() {
        //given
        OIDCUser oidcUser = new OIDCUser(OAuthProvider.KAKAO, "snsID", "email", "image Url");
        given(idTokenValidatorHandler.verifyIdToken(any(), any())).willReturn(oidcUser);
        given(userRepository.findByOauthProviderAndOauthId(any(), any())).willReturn(
                Optional.empty());

        //when
        OIDCLoginResponseDto result = oidcSignInUseCase.oauthLogin(
                new SignInRequestDto(OAuthProvider.KAKAO,
                        "tokens..", false));

        //then
        assertThat(result.isNewUser()).isTrue();
        assertThat(result.getAccessToken()).isNull();
        assertThat(result.getRefreshToken()).isNull();
    }

    @DisplayName("가입된 유저라면 토큰을 발급한다")
    @Test
    void AlreadyRegisterUserGenerateToken() {
        //given
        OIDCUser oidcUser = new OIDCUser(OAuthProvider.KAKAO, "snsID", "email", "image Url");
        User user = User.builder()
                        .oAuthId(oidcUser.getOauthId())
                        .oAuthProvider(oidcUser.getOAuthProvider())
                        .build();
        ReflectionTestUtils.setField(user, "id", 1L);
        given(idTokenValidatorHandler.verifyIdToken(any(), any())).willReturn(oidcUser);
        given(userRepository.findByOauthProviderAndOauthId(any(), any())).willReturn(
                Optional.of(user));
        //when
        OIDCLoginResponseDto result = oidcSignInUseCase.oauthLogin(
                new SignInRequestDto(OAuthProvider.KAKAO,
                        "tokens..", true));
        //then
        assertThat(result.isNewUser()).isFalse();
        assertThat(result.getAccessToken()).isNotNull();
        assertThat(result.getRefreshToken()).isNotNull();
        verify(jwtProvider, times(1)).generateAccessToken(user);
        verify(jwtProvider, times(1)).generateRefreshToken();
    }

    @DisplayName("로그인 유지를 원하지 않으면 accessToken만 발급받는다.")
    @Test
    void notWantOnlyGenerateAccessToken() {
        //given
        OIDCUser oidcUser = new OIDCUser(OAuthProvider.KAKAO, "snsID", null, null);
        User user = User.builder()
                        .oAuthId(oidcUser.getOauthId())
                        .oAuthProvider(oidcUser.getOAuthProvider())
                        .build();
        ReflectionTestUtils.setField(user, "id", 1L);
        given(idTokenValidatorHandler.verifyIdToken(any(), any())).willReturn(oidcUser);
        given(userRepository.findByOauthProviderAndOauthId(any(), any())).willReturn(
                Optional.of(user));
        //when
        OIDCLoginResponseDto result = oidcSignInUseCase.oauthLogin(
                new SignInRequestDto(OAuthProvider.KAKAO,
                        "tokens..", false));
        //then
        assertThat(result.isNewUser()).isFalse();
        assertThat(result.getAccessToken()).isNotNull();
        assertThat(result.getRefreshToken()).isNull();
        verify(jwtProvider, times(1)).generateAccessToken(user);
        verify(jwtProvider, never()).generateRefreshToken();
    }

    private JwtProperty mockJwtProperty() {
        JwtProperty jwtProperty = new JwtProperty();
        jwtProperty.setAccessKey("accesskeysssssssssssssssssssss");
        jwtProperty.setRefreshKey("refreshhhhhhhhhhhhhhhhhhhhhhhh");
        jwtProperty.setAccessExpiredMin(20);
        jwtProperty.setRefreshExpiredDay(20);
        return jwtProperty;
    }

}