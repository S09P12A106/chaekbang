package com.jsix.chaekbang.global.exception;


import com.jsix.chaekbang.global.dto.HttpResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<?> handleBusiness(BusinessException e) {
        return HttpResponse.fail(HttpStatus.valueOf(e.getStatusCode()), e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValid(MethodArgumentNotValidException e) {
        String errorMessage = getBindingResultErrorMessage(e.getBindingResult());
        return HttpResponse.fail(HttpStatus.BAD_REQUEST, errorMessage);
    }

    private String getBindingResultErrorMessage(BindingResult bindingResult) {
        ObjectError objectError = bindingResult.getAllErrors()
                                               .stream()
                                               .findFirst()
                                               .get();
        return objectError.getDefaultMessage();
    }
    
}
