package com.jsix.chaekbang.domain.auth.application.oidc;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;

import com.jsix.chaekbang.domain.auth.application.jwt.JwtValidator;
import com.jsix.chaekbang.global.exception.InvalidTokenException;
import com.jsix.chaekbang.global.exception.KakaoOpenKeyFeignException;
import com.jsix.chaekbang.global.property.KakaoProperty;
import feign.FeignException;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


@ExtendWith(MockitoExtension.class)
class KakaoIDTokenValidatorTest {

    @InjectMocks
    KakaoIDTokenValidator kakaoIDTokenValidator;

    @Mock
    KaKaoOauthClient kaKaoOauthClient;
    @Mock
    JwtValidator jwtValidator;
    @Mock
    KakaoProperty kakaoProperty;


    @DisplayName("카카오 공개키 목록 조회 실패시 예외를 반환한다")
    @Test
    void kakaoPublicKeyFailsThrowException() {
        //given
        given(kaKaoOauthClient.getKakaoOIDCOpenKeys()).willThrow(FeignException.class);

        //when then
        assertThatThrownBy(() ->
                kakaoIDTokenValidator.getOIDCOpenKeys())
                .isInstanceOf(KakaoOpenKeyFeignException.class)
                .hasMessageContaining("공개키 목록을 가져오는데 실패하였습니다.");
    }


    @DisplayName("카카오 idTOken의 페이로드에 oauth id 값이 없으면 예외를 반환한다.")
    @Test
    void idTokenPayloadNotContainsOAuthId() {
        //given
        Map<String, Object> payload = new HashMap<>();

        //when then
        assertThatThrownBy(() ->
                kakaoIDTokenValidator.extractUserInfo(payload))
                .isInstanceOf(InvalidTokenException.class)
                .hasMessageContaining("잘못된 인증 정보입니다.");
    }

    @DisplayName("카카오 idTOken의 페이로드에 필수 동의 값이 없으면 예외를 반환한다.")
    @Test
    void idTokenPayloadNotContainsRequireValue() {
        //given
        Map<String, Object> payload = new HashMap<>();
        payload.put("sub", "123456");
        //when then
        assertThatThrownBy(() ->
                kakaoIDTokenValidator.extractUserInfo(payload))
                .isInstanceOf(InvalidTokenException.class)
                .hasMessageContaining("필수 항목 동의가 필요합니다.");
    }
}