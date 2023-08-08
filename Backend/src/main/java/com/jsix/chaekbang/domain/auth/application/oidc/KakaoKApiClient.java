package com.jsix.chaekbang.domain.auth.application.oidc;

import com.jsix.chaekbang.domain.auth.dto.KakaoWithDrawResponseDto;
import com.jsix.chaekbang.domain.auth.infra.KakaoOAuthClientConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
        name = "KakaoKApiClient",
        url = "https://kapi.kakao.com",
        configuration = KakaoOAuthClientConfig.class
)
@Component
public interface KakaoKApiClient {

    @PostMapping(value = "/v1/user/unlink", headers = "Authorization=KakaoAK ${kakao.admin-key}")
    KakaoWithDrawResponseDto unlink(@RequestParam("target_id_type") String type,
            @RequestParam("target_id") String snsId);
}
