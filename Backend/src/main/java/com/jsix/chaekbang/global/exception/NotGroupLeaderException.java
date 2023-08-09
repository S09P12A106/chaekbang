package com.jsix.chaekbang.global.exception;

public class NotGroupLeaderException extends BusinessException {

    public NotGroupLeaderException(String message) {
        super(403, message);
    }
}
