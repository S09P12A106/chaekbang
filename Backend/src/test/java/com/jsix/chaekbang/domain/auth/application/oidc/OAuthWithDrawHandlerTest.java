package com.jsix.chaekbang.domain.auth.application.oidc;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.jsix.chaekbang.domain.auth.exception.OAuthWithDrawFailException;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.domain.user.domain.User;
import feign.FeignException.FeignClientException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


@ExtendWith(MockitoExtension.class)
class OAuthWithDrawHandlerTest {

    @Mock
    KakaoKApiClient kakaoKApiClient;

    @InjectMocks
    OAuthWithDrawHandler oAuthWithDrawHandler;

    @DisplayName("회원탈퇴 외부 API 실패 시 예외를 반환한다.")
    @Test
    void failExternalApiThrownException() {
        //given
        given(kakaoKApiClient.unlink(any(), any())).willThrow(FeignClientException.class);
        User user = User.builder()
                        .oAuthId("12345")
                        .oAuthProvider(OAuthProvider.KAKAO)
                        .build();
        //when then
        assertThatThrownBy(() ->
                oAuthWithDrawHandler.withDraw(user))
                .isInstanceOf(OAuthWithDrawFailException.class);
    }
}