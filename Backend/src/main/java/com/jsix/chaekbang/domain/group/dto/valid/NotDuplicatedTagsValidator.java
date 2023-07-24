package com.jsix.chaekbang.domain.group.dto.valid;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class NotDuplicatedTagsValidator implements ConstraintValidator<NotDuplicatedTags, List> {

    @Override
    public boolean isValid(List value, ConstraintValidatorContext context) {
        Set<String> tags = new HashSet<>(value);
        return tags.size() == value.size();
    }

    @Override
    public void initialize(NotDuplicatedTags constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }
}
