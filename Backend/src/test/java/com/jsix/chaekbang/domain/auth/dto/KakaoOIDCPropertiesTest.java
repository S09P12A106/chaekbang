package com.jsix.chaekbang.domain.auth.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.jsix.chaekbang.IntegrationTestSupport;
import com.jsix.chaekbang.global.property.KakaoProperty;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class KakaoOIDCPropertiesTest extends IntegrationTestSupport {

    @Autowired
    private KakaoProperty kakaoOIDCProperties;


    @Test
    @DisplayName("카카오 iss와 aud값이 잘 주입되었는지 확인합니다.")
    void testISSAndAUD() {
        assertThat(kakaoOIDCProperties.getAud()).isNotNull();
        assertThat(kakaoOIDCProperties.getIss()).isNotNull();
        assertThat(kakaoOIDCProperties.getAdminKey()).isNotNull();
    }

}