package com.jsix.chaekbang.domain.auth.application.oidc;


import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.jsix.chaekbang.domain.auth.application.jwt.JwtValidator;
import com.jsix.chaekbang.domain.auth.dto.OIDCPublicKeyDto;
import com.jsix.chaekbang.domain.auth.dto.OIDCPublicKeyResponse;
import com.jsix.chaekbang.global.exception.NotMatchKIDException;
import com.jsix.chaekbang.global.property.KakaoProperty;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class IDTokenValidatorTest {

    IDTokenValidator kakaoIdTokenValidator;

    @Mock
    JwtValidator jwtValidator;
    @Mock
    KaKaoOauthClient kaKaoOauthClient;

    @BeforeEach
    void setUp() {
        KakaoProperty kakaoProperty = new KakaoProperty();
        kakaoProperty.setIss("Iss");
        kakaoProperty.setAud("aud");
        kakaoIdTokenValidator =
                new KakaoIDTokenValidator(jwtValidator, kaKaoOauthClient, kakaoProperty);
    }

    @DisplayName("OAUTH 회사에서 제공한 JWK 중 idToken의 KID가 없으면 예외를 반환한다.")
    @Test
    void kakaoJwkListCheckKidFromIdToken() {
        //given
        String KID_1 = "K_Kid1";
        String KID_2 = "K_Kid2";
        List<OIDCPublicKeyDto> keyDtos = List.of(mockPublicKey(KID_1),
                mockPublicKey(KID_2));
        OIDCPublicKeyResponse publicKeyResponse = new OIDCPublicKeyResponse(keyDtos);
        given(kaKaoOauthClient.getKakaoOIDCOpenKeys()).willReturn(publicKeyResponse);
        String NotMatchKid = "NOT_MATCH_KID";
        given(jwtValidator.getKidFromHeader(any())).willReturn(NotMatchKid);

        //when then
        assertThatThrownBy(() ->
                kakaoIdTokenValidator.validateIdTokenAndGetUserInfo("Token")
        ).isInstanceOf(NotMatchKIDException.class)
         .hasMessage("일치하는 공개키가 없습니다.");
    }

    private OIDCPublicKeyDto mockPublicKey(String kid) {
        return new OIDCPublicKeyDto(kid, "alg", "use", "n", "e");
    }
}