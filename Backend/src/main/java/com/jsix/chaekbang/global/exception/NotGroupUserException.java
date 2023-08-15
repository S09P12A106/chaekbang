package com.jsix.chaekbang.global.exception;

public class NotGroupUserException extends BusinessException {

    public NotGroupUserException(String message) {
        super(403, message);
    }
}
