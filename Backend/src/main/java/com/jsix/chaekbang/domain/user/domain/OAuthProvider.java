package com.jsix.chaekbang.domain.user.domain;

import com.jsix.chaekbang.global.exception.BusinessException;

public enum OAuthProvider {
    GOOGLE, KAKAO;


    public static OAuthProvider of(String provider) {
        try {
            return OAuthProvider.valueOf(provider);
        } catch (IllegalArgumentException e) {
            throw new BusinessException("oauth provider not match");
        }
    }
}