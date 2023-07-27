package com.jsix.chaekbang.global.exception;

public class InvalidTokenException extends BusinessException{

    public InvalidTokenException(String message) {
        super(401, message);
    }
}
