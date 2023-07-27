package com.jsix.chaekbang.domain.auth.application;

import com.jsix.chaekbang.domain.auth.dto.OIDCLoginResponseDto;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.exception.BusinessException;
import com.jsix.chaekbang.global.exception.NotSupportedProviderException;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class OIDCLoginUseCase {

    private final IDTokenValidator kakaoIDTokenValidator;
    private final UserRepository userRepository;

    public OIDCLoginUseCase(UserRepository userRepository, IDTokenValidator kakaoIDTokenValidator) {
        this.userRepository = userRepository;
        this.kakaoIDTokenValidator = kakaoIDTokenValidator;
    }

    public OIDCLoginResponseDto oauthLogin(OAuthProvider oauthProvider, String idToken,
            Boolean isLoginKeep) {
        String oauthID;
        if (oauthProvider.name().equals("KAKAO")) {
            oauthID = kakaoIDTokenValidator.getOauthIDFromSignedToken(idToken);
        } else {
            throw new NotSupportedProviderException("지원하지 않는 oauth 제공자입니다.");
        }

        Optional<User> savedUser = userRepository.findByOauthProviderAndOauthId(
                oauthProvider, oauthID);

        if (savedUser.isPresent()) {
            // JWT 토큰 발급 로직에서 isLoginKeep 변수 사용 예정
            return OIDCLoginResponseDto.logined("", "");
        }
        return OIDCLoginResponseDto.isNew();
    }
}
