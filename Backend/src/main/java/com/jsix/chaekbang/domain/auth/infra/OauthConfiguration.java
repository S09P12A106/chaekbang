package com.jsix.chaekbang.domain.auth.infra;

import com.jsix.chaekbang.domain.auth.application.IDTokenValidator;
import com.jsix.chaekbang.domain.auth.application.KaKaoOauthClient;
import com.jsix.chaekbang.domain.auth.application.KakaoIDTokenValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class OauthConfiguration {

    private final KaKaoOauthClient kaKaoOauthClient;
    private final JWTValidator jwtValidator;


    @Bean("kakaoIDTokenValidator")
    public IDTokenValidator kakaoOIDCValidation() {
        return new KakaoIDTokenValidator(jwtValidator, kaKaoOauthClient);
    }

}
