package com.jsix.chaekbang.domain.user.domain;

import com.jsix.chaekbang.global.exception.NotSupportedProviderException;

public enum OAuthProvider {
    GOOGLE, KAKAO;


    public static OAuthProvider of(String provider) {
        try {
            return OAuthProvider.valueOf(provider);
        } catch (IllegalArgumentException e) {
            throw new NotSupportedProviderException("지원하지 않는 oauth 제공자입니다.");
        }
    }
}