package com.jsix.chaekbang.domain.auth.application;

import com.jsix.chaekbang.domain.auth.application.jwt.JwtProvider;
import com.jsix.chaekbang.domain.auth.application.oidc.IDTokenValidatorHandler;
import com.jsix.chaekbang.domain.auth.dto.OIDCLoginResponseDto;
import com.jsix.chaekbang.domain.auth.dto.OIDCUser;
import com.jsix.chaekbang.domain.auth.dto.request.SignInRequestDto;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.User;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class OIDCSignInUseCase {

    private final IDTokenValidatorHandler idTokenValidatorHandler;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    public OIDCLoginResponseDto oauthLogin(SignInRequestDto requestDto) {
        OIDCUser oidcUser = idTokenValidatorHandler.verifyIdToken(requestDto.getOauthProvider(),
                requestDto.getIdToken());

        Optional<User> savedUser = userRepository.findByOauthProviderAndOauthId(
                oidcUser.getOAuthProvider(), oidcUser.getOauthId());

        if (savedUser.isEmpty()) {
            return OIDCLoginResponseDto.isNew();
        }
        User user = savedUser.get();
        String accessToken = jwtProvider.generateAccessToken(user);

        Boolean isLoginKeep = requestDto.getIsLoginKeep();
        if (!isLoginKeep) {
            return OIDCLoginResponseDto.logined(accessToken, null);
        }
        String refreshToken = jwtProvider.generateRefreshToken();
        user.setRefreshToken(refreshToken);
        return OIDCLoginResponseDto.logined(accessToken, refreshToken);
    }

}
