package com.jsix.chaekbang.domain.auth.application.oidc;

import com.jsix.chaekbang.domain.auth.application.jwt.JwtValidator;
import com.jsix.chaekbang.domain.auth.dto.OIDCPublicKeyDto;
import com.jsix.chaekbang.domain.auth.dto.OIDCPublicKeyResponse;
import com.jsix.chaekbang.domain.auth.dto.OIDCUser;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.global.exception.InvalidTokenException;
import com.jsix.chaekbang.global.exception.KakaoOpenKeyFeignException;
import com.jsix.chaekbang.global.property.KakaoProperty;
import feign.FeignException;
import java.util.List;
import java.util.Map;

public class KakaoIDTokenValidator extends IDTokenValidator {

    private final KaKaoOauthClient kaKaoOauthClient;
    private final String KAKAO_ID_KEY = "sub";
    private final String KAKAO_EMAIL_KEY = "email";
    private final String KAKAO_PROFILE_IMAGE_KEY = "picture";
    private final KakaoKApiClient kakaoKApiClient;


    public KakaoIDTokenValidator(JwtValidator jwtValidator, KaKaoOauthClient kaKaoOauthClient,
        KakaoProperty kakaoProperties, KakaoKApiClient kakaoKApiClient) {
        super(jwtValidator, kakaoProperties.toOIDCProperty());
        this.kaKaoOauthClient = kaKaoOauthClient;
        this.kakaoKApiClient = kakaoKApiClient;
    }

    @Override
    public List<OIDCPublicKeyDto> getOIDCOpenKeys() {
        try {
            OIDCPublicKeyResponse kakaoOIDCOpenKeys = kaKaoOauthClient.getKakaoOIDCOpenKeys();
            return kakaoOIDCOpenKeys.getKeys();
        } catch (FeignException e) {
            throw new KakaoOpenKeyFeignException("공개키 목록을 가져오는데 실패하였습니다.");
        }
    }

    @Override
    public OIDCUser extractUserInfo(Map<String, Object> payload) {
        checkRequireProperty(payload);

        String oauthId = (String) payload.get(KAKAO_ID_KEY);
        String email = (String) payload.get(KAKAO_EMAIL_KEY);
        String profileImage = (String) payload.get(KAKAO_PROFILE_IMAGE_KEY);

        return OIDCUser.builder()
            .oAuthProvider(OAuthProvider.KAKAO)
            .profileImageUrl(profileImage)
            .email(email)
            .oauthId(oauthId)
            .build();
    }

    private void checkRequireProperty(Map<String, Object> payload) {
        // 해당 key가 없으면 아예 잘못된 정보
        if (payload.get(KAKAO_ID_KEY) == null) {
            throw new InvalidTokenException("잘못된 인증 정보입니다.");
        }

        // 선택 항목을 동의하지 않음 --> 카카오는 EMAIL 같은 경우.
        if (payload.get(KAKAO_EMAIL_KEY) == null) {
            //TODO : 회원탈퇴 API를 요청해서 다시 동의하도록 처리해야 한다.
            String oauthId = (String) payload.get(KAKAO_ID_KEY);
            kakaoKApiClient.unlink("user_id", oauthId);
            throw new InvalidTokenException("필수 항목 동의가 필요합니다.");
        }
    }

}
