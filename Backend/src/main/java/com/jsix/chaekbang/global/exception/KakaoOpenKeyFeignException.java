package com.jsix.chaekbang.global.exception;

public class KakaoOpenKeyFeignException extends BusinessException {

    public KakaoOpenKeyFeignException(String message) {
        super(500, message);
    }
}
