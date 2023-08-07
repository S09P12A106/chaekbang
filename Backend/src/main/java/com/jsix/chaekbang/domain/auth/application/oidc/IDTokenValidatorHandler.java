package com.jsix.chaekbang.domain.auth.application.oidc;


import com.jsix.chaekbang.domain.auth.dto.OIDCUser;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.global.exception.NotSupportedProviderException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class IDTokenValidatorHandler {


    private final IDTokenValidator kakaoIDTokenValidator;

    public OIDCUser verifyIdToken(OAuthProvider oAuthProvider, String token) {
        if (oAuthProvider.equals(OAuthProvider.KAKAO)) {
            return kakaoIDTokenValidator.validateIdTokenAndGetUserInfo(token);
        }
        throw new NotSupportedProviderException("해당 Provider를 제공하지 않습니다");
    }


}
