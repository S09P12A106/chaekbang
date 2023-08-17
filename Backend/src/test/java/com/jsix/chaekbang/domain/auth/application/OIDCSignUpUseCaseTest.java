package com.jsix.chaekbang.domain.auth.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.jsix.chaekbang.domain.auth.application.jwt.JwtProvider;
import com.jsix.chaekbang.domain.auth.application.oidc.IDTokenValidatorHandler;
import com.jsix.chaekbang.domain.auth.dto.OIDCUser;
import com.jsix.chaekbang.domain.auth.dto.SignUpResponseDto;
import com.jsix.chaekbang.domain.auth.dto.request.SignUpRequestDto;
import com.jsix.chaekbang.domain.auth.exception.AlreadyRegisteredUserException;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.Gender;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import java.time.LocalDate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


@ExtendWith(MockitoExtension.class)
class OIDCSignUpUseCaseTest {

    @Mock
    UserRepository userRepository;

    @Mock
    JwtProvider jwtProvider;

    @Mock
    IDTokenValidatorHandler idTokenValidatorHandler;

    @InjectMocks
    OIDCSignUpUseCase oidcSignUpUseCase;


    @DisplayName("이미 가입된 유저는 예외를 반환한다.")
    @Test
    void AlreadyRegisteredUserThrowException() {
        //given
        SignUpRequestDto request = mockRequestDto();
        given(idTokenValidatorHandler.verifyIdToken(any(), any())).willReturn(OIDCUser.builder()
                                                                                      .build());
        given(userRepository.existByOauthProviderAndOauthId(any(), any())).willReturn(true);

        //when then
        assertThatThrownBy(() -> oidcSignUpUseCase.SignUp(request))
                .isInstanceOf(AlreadyRegisteredUserException.class);
    }

    @DisplayName("회원가입 성공후 Jwt토큰을 반환한다.")
    @Test
    void signUpSuccessAndReturnToken() {
        //given
        SignUpRequestDto request = mockRequestDto();
        String accessToken = "access";
        String refreshToken = "refresh";
        given(idTokenValidatorHandler.verifyIdToken(any(), any())).willReturn(OIDCUser.builder()
                                                                                      .build());
        given(userRepository.existByOauthProviderAndOauthId(any(), any())).willReturn(false);
        given(jwtProvider.generateAccessToken(any())).willReturn(accessToken);
        given(jwtProvider.generateRefreshToken()).willReturn(refreshToken);

        //when
        SignUpResponseDto result = oidcSignUpUseCase.SignUp(request);

        //then
        assertThat(result.getAccessToken()).isEqualTo(accessToken);
        assertThat(result.getRefreshToken()).isEqualTo(refreshToken);

    }


    private SignUpRequestDto mockRequestDto() {
        return new SignUpRequestDto("nickname", LocalDate.now()
                                                         .minusYears(1), Gender.F, "About..",
                OAuthProvider.KAKAO, "ioTOkens");
    }

}