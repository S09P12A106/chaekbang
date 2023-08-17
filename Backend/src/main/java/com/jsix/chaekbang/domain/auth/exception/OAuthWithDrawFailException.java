package com.jsix.chaekbang.domain.auth.exception;

import com.jsix.chaekbang.global.exception.BusinessException;

public class OAuthWithDrawFailException extends BusinessException {

    public OAuthWithDrawFailException(int statusCode, String message) {
        super(statusCode, message);
    }
}
