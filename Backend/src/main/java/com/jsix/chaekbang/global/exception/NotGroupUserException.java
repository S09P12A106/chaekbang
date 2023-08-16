package com.jsix.chaekbang.global.exception;

public class NotGroupUserException extends BusinessException {

    public NotGroupUserException(String message) {
        super(403, message);
    }

    public NotGroupUserException() {
        super(403, "해당 모임에 가입된 유저가 아닙니다.");
    }
}
