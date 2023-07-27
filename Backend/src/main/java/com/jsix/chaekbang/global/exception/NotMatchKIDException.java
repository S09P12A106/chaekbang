package com.jsix.chaekbang.global.exception;

public class NotMatchKIDException extends BusinessException{

    public NotMatchKIDException(String message) {
        super(401,message);
    }
}
