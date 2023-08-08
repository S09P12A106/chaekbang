package com.jsix.chaekbang.domain.auth.infra;

import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;

public class KakaoOAuthClientConfig {

    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> {
            requestTemplate.header("Content-Type", "application/x-www-form-urlencoded");
        };
    }

}
