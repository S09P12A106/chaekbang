package com.jsix.chaekbang.domain.auth.dto.request;


import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.jsix.chaekbang.domain.user.domain.Gender;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class SignUpRequestDtoTest {

    private ValidatorFactory validatorFactory;
    private Validator validator;

    @BeforeEach
    void init() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }


    @DisplayName("회원가입 요청시 성별에 M 혹은 F가 아니면 실패한다.")
    @ParameterizedTest
    @ValueSource(strings = {"FF", "MM", "1", "q", "!", "", "Z", "z", " ", "FM"})
    void genderNotForThrownException(String gender) {
        //given
        LocalDate now = LocalDate.now();
        LocalDate birth = now.minusYears(1);
        //when //then
        assertThatThrownBy(() -> {
            SignUpRequestDto signUpRequestDto = new SignUpRequestDto("nickname", birth,
                    Gender.valueOf(gender),
                    "intro..", OAuthProvider.KAKAO, "indtoken..");
        }).isInstanceOf(IllegalArgumentException.class);
    }

    @DisplayName("회원가입 요청시 성별에 M 혹은 F면 통과한다.")
    @ParameterizedTest
    @ValueSource(strings = {"F", "M"})
    void genderIsForMSuccess(String gender) {
        //given
        LocalDate now = LocalDate.now();
        LocalDate birth = now.minusYears(1);

        SignUpRequestDto signUpRequestDto = new SignUpRequestDto("nickname", birth,
                Gender.valueOf(gender),
                "intro..", OAuthProvider.KAKAO, "indtoken..");
        //when
        Set<ConstraintViolation<SignUpRequestDto>> violations = validator.validate(
                signUpRequestDto);
        //then
        assertThat(violations).isEmpty();
    }

    @DisplayName("회원가입 요청시 미래의 날짜로 입력시 실패한다.")
    @ParameterizedTest
    @ValueSource(strings = {"9999-03-21", "5555-04-21"})
    void isFutureBirthThrowException(String birth) {
        //given
        LocalDate births = LocalDate.parse(birth, DateTimeFormatter.ISO_DATE);
        SignUpRequestDto signUpRequestDto = new SignUpRequestDto("nickname", births, Gender.M,
                "intro..", OAuthProvider.KAKAO, "indtoken..");
        //when
        Set<ConstraintViolation<SignUpRequestDto>> violations = validator.validate(
                signUpRequestDto);
        //then
        assertThat(violations).isNotEmpty();
    }

    @DisplayName("회원가입 요청시 정상적인 값이 오면 성공한다.")
    @Test
    void success() {
        //given
        LocalDate births = LocalDate.parse("1998-04-07", DateTimeFormatter.ISO_DATE);
        SignUpRequestDto nickname = new SignUpRequestDto("nickname", births, Gender.M,
                "intro..", OAuthProvider.KAKAO, "indtoken..");
        //when
        Set<ConstraintViolation<SignUpRequestDto>> violations = validator.validate(nickname);
        //then
        assertThat(violations).isEmpty();
    }
}