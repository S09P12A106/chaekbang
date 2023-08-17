package com.jsix.chaekbang.global.exception;

public class S3UploadException extends BusinessException {

    public S3UploadException(String message) {
        super(500, message);
    }
}
