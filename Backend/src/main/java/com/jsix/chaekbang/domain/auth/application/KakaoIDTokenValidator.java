package com.jsix.chaekbang.domain.auth.application;

import com.jsix.chaekbang.domain.auth.dto.OIDCPublicKeyDto;
import com.jsix.chaekbang.domain.auth.dto.OIDCPublicKeyResponse;
import com.jsix.chaekbang.domain.auth.infra.JWTValidator;
import com.jsix.chaekbang.global.exception.KakaoOpenKeyFeignException;
import feign.FeignException;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

public class KakaoIDTokenValidator extends IDTokenValidator {

    @Value("${kakao.iss}")
    String iss;

    @Value("${kakao.aud}")
    String aud;
    private final KaKaoOauthClient kaKaoOauthClient;

    public KakaoIDTokenValidator(JWTValidator jwtValidator, KaKaoOauthClient kaKaoOauthClient) {
        super(jwtValidator);
        this.kaKaoOauthClient = kaKaoOauthClient;
    }

    @Override
    public List<OIDCPublicKeyDto> getOIDCOpenKeys() {
        OIDCPublicKeyResponse oidcPublicKeyResponse;
        try {
            oidcPublicKeyResponse = kaKaoOauthClient.getKakaoOIDCOpenKeys();
        } catch (FeignException e) {
            throw new KakaoOpenKeyFeignException("공개키 목록을 가져오는데 실패하였습니다.");
        }
        return oidcPublicKeyResponse.getKeys();
    }
}
