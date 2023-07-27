package com.jsix.chaekbang.global.exception;

public class ExpiredTokenException extends BusinessException{

    public ExpiredTokenException(String message) {
        super(401, message);
    }
}
