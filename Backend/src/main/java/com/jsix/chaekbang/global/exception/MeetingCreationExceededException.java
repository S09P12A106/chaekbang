package com.jsix.chaekbang.global.exception;

public class MeetingCreationExceededException extends BusinessException{

    public MeetingCreationExceededException(String message) {
        super(400, message);
    }
}
