package com.jsix.chaekbang.domain.auth.application.oidc;

import com.jsix.chaekbang.domain.auth.dto.OIDCPublicKeyResponse;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(
        name = "KakaoAuthClient",
        url = "https://kauth.kakao.com"
)
@Component
public interface KaKaoOauthClient {


    @Cacheable(value = "kakaoPublicKeys")
    @GetMapping("/.well-known/jwks.json")
    OIDCPublicKeyResponse getKakaoOIDCOpenKeys();

}
