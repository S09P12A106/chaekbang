package com.jsix.chaekbang.global.property;

import com.jsix.chaekbang.domain.auth.application.oidc.OIDCProperty;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("kakao")
@Data
public class KakaoProperty {

    private String iss;
    private String aud;
    private String adminKey;

    public OIDCProperty toOIDCProperty() {
        return new OIDCProperty(iss, aud);
    }
}
