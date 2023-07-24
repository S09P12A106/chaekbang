package com.jsix.chaekbang.domain.group.dto.valid;


import java.util.regex.Pattern;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class NotContainsBlankValidator implements ConstraintValidator<NotContainsBlank, String> {

    @Override
    public boolean isValid(String tag, ConstraintValidatorContext context) {
        return !Pattern.matches(".*\\s+.*", tag);
    }

    @Override
    public void initialize(NotContainsBlank constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }
}
