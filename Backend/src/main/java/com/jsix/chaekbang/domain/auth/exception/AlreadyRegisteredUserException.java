package com.jsix.chaekbang.domain.auth.exception;

import com.jsix.chaekbang.global.exception.BusinessException;

public class AlreadyRegisteredUserException extends BusinessException {

    public AlreadyRegisteredUserException(String message) {
        super(409, message);
    }
}
