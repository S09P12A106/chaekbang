package com.jsix.chaekbang.global.exception;

public class NotSupportedProviderException extends BusinessException {

    public NotSupportedProviderException(String message) {
        super(401, message);
    }
}
