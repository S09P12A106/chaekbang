package com.jsix.chaekbang.domain.meeting.domain;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.jsix.chaekbang.IntegrationTestSupport;
import com.jsix.chaekbang.global.exception.InvalidSessionIdException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;

class SessionIdValidatorTest extends IntegrationTestSupport {

    @Autowired
    private SessionIdValidator sessionIdValidator;

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
}