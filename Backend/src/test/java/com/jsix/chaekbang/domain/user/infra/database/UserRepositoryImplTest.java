package com.jsix.chaekbang.domain.user.infra.database;

import com.jsix.chaekbang.IntegrationTestSupport;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.Gender;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.domain.user.domain.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;


class UserRepositoryImplTest extends IntegrationTestSupport {

    @Autowired
    UserRepository userRepository;


    @DisplayName("데이터베이스에 유저를 저장할 수 있다")
    @Test
    void save() {
        //given
        User user = User.createUser(OAuthProvider.GOOGLE, "oAuthId", "email", Gender.M, LocalDate.now(),
                "profileImageUrl", "aboutMe", "nickname");
        //when
        User savedUser = userRepository.save(user);
        //then
        assertThat(savedUser.getId()).isNotNull();
    }
}