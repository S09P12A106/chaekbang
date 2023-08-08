package com.jsix.chaekbang.domain.auth.application.oidc;


import com.jsix.chaekbang.domain.auth.exception.OAuthWithDrawFailException;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.exception.NotSupportedProviderException;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuthWithDrawHandler {

    private final KakaoKApiClient kakaoKApiClient;

    public void withDraw(User user) {
        OAuthProvider oauthProvider = user.getOauthProvider();
        String oauthId = user.getOauthId();

        try {
            call(oauthProvider, oauthId);
        } catch (FeignException e) {
            throw new OAuthWithDrawFailException(500, "회원탈퇴 실패");
        }
    }

    private void call(OAuthProvider oAuthProvider, String oauthId) {
        if (oAuthProvider.equals(OAuthProvider.KAKAO)) {
            kakaoKApiClient.unlink("user_id", oauthId);
            return;
        }
        throw new NotSupportedProviderException("지원하지 않는 OAuth 방식입니다.");
    }
}
