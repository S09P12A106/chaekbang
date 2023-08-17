package com.jsix.chaekbang.global.exception;


import com.jsix.chaekbang.global.dto.HttpResponse;
import javax.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<?> handleBusiness(BusinessException e) {
        return HttpResponse.fail(HttpStatus.valueOf(e.getStatusCode()), e.getMessage());
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<?> handleBindException(BindException e){
        String errorMessage = getBindingResultErrorMessage(e.getBindingResult());
        return HttpResponse.fail(HttpStatus.BAD_REQUEST, errorMessage);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException e) {
        return HttpResponse.fail(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<?> handleMissingServletRequestParameterException(
            MissingServletRequestParameterException e) {
        return HttpResponse.fail(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handlerHttpMessageNotReadableException(
            HttpMessageNotReadableException e) {
        return HttpResponse.fail(HttpStatus.BAD_REQUEST, e.getMessage());
    }


    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<?> handleUploadSizeExceeded(MaxUploadSizeExceededException e) {
        return HttpResponse.fail(HttpStatus.PAYLOAD_TOO_LARGE, "20MB 이하의 이미지를 등록해주세요.");
    }

    private String getBindingResultErrorMessage(BindingResult bindingResult) {
        ObjectError objectError = bindingResult.getAllErrors()
                                               .stream()
                                               .findFirst()
                                               .get();
        return objectError.getDefaultMessage();
    }

}
