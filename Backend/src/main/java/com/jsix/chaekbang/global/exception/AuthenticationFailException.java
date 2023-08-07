package com.jsix.chaekbang.global.exception;

public class AuthenticationFailException extends BusinessException {

    public AuthenticationFailException(String message) {
        super(401, message);
    }
}
