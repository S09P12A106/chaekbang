package com.jsix.chaekbang.domain.auth.application.oidc;


import lombok.Getter;

@Getter
public class OIDCProperty {

    private final String issuer;
    private final String audience;

    public OIDCProperty(String issuer, String audience) {
        this.issuer = issuer;
        this.audience = audience;
    }
}
