package com.jsix.chaekbang.global.exception;

public class PermissionDeniedException extends BusinessException {

    public PermissionDeniedException(String message) {
        super(403, message);
    }
}
