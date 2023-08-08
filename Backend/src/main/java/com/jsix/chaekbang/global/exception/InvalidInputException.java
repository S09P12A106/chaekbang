package com.jsix.chaekbang.global.exception;

public class InvalidInputException extends BusinessException {

    public InvalidInputException(String message) {
        super(400, message);
    }
}
