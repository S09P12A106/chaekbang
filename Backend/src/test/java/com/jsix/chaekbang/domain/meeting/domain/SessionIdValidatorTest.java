package com.jsix.chaekbang.domain.meeting.domain;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import com.jsix.chaekbang.IntegrationTestSupport;
import com.jsix.chaekbang.global.exception.InvalidSessionIdException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;

class SessionIdValidatorTest extends IntegrationTestSupport {

    @Autowired
    private SessionIdValidator sessionIdValidator;


    @DisplayName("올바른 sessionId일 경우 예외를 발생시키지 않는다.")
    @Test
    void 올바른_session_ID_test() {
        // given
        String sessionId = "abc_test_1";
        // when

        // then
        assertDoesNotThrow(() -> sessionIdValidator.validate(sessionId));
    }

    @DisplayName("올바르지 않은 sessionId일 경우 InvalidSessionIdException 을 발생시킨다.")
    @ParameterizedTest
    @ValueSource(strings = {"", "   ", "\n", "__", "abc", "abc_1", "abc_def", "abc_dsa_", "_abc_",
            "_abc_1", "123", "_23"})
    void 올바르지_않은_session_Id_test(String sessionId) {
        // given
        // when
        // then
        assertThatThrownBy(() -> sessionIdValidator.validate(sessionId))
                .isInstanceOf(InvalidSessionIdException.class)
                .hasMessageContaining("올바른");
    }

    @DisplayName("sessionId에 잘못된 환경이 있는 경우 InvalidSessionIdException을 발생시킨다.")
    @Test
    void sessionId에_잘못된_환경이_있는_경우_test() {
        // given
        String sessionId = "abc_prod_1";
        // when
        // then
        assertThatThrownBy(() -> sessionIdValidator.validate(sessionId))
                .isInstanceOf(InvalidSessionIdException.class)
                .hasMessageContaining("유효한");
    }
}