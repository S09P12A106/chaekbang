package com.jsix.chaekbang.domain.auth.infra;

import com.jsix.chaekbang.domain.auth.application.jwt.JwtValidator;
import com.jsix.chaekbang.domain.auth.application.oidc.IDTokenValidator;
import com.jsix.chaekbang.domain.auth.application.oidc.KaKaoOauthClient;
import com.jsix.chaekbang.domain.auth.application.oidc.KakaoIDTokenValidator;
import com.jsix.chaekbang.domain.auth.application.oidc.KakaoKApiClient;
import com.jsix.chaekbang.global.property.KakaoProperty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class OauthConfiguration {

    private final KaKaoOauthClient kaKaoOauthClient;
    private final JwtValidator jwtValidator;
    private final KakaoProperty kakaoOIDCProperties;
    private final KakaoKApiClient kakaoKApiClient;

    @Bean("kakaoIDTokenValidator")
    public IDTokenValidator kakaoOIDCValidation() {
        return new KakaoIDTokenValidator(jwtValidator, kaKaoOauthClient, kakaoOIDCProperties,
            kakaoKApiClient);
    }

}
