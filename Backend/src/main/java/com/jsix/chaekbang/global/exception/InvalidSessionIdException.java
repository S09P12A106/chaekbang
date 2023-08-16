package com.jsix.chaekbang.global.exception;

public class InvalidSessionIdException extends BusinessException {

    public InvalidSessionIdException(String message) {
        super(400, message);
    }
}
