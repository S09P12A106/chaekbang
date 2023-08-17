package com.jsix.chaekbang.domain.auth.application;


import com.jsix.chaekbang.domain.auth.application.jwt.JwtProvider;
import com.jsix.chaekbang.domain.auth.application.oidc.IDTokenValidatorHandler;
import com.jsix.chaekbang.domain.auth.dto.OIDCUser;
import com.jsix.chaekbang.domain.auth.dto.SignUpResponseDto;
import com.jsix.chaekbang.domain.auth.dto.request.SignUpRequestDto;
import com.jsix.chaekbang.domain.auth.exception.AlreadyRegisteredUserException;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class OIDCSignUpUseCase {

    private final IDTokenValidatorHandler idTokenValidatorHandler;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    public SignUpResponseDto SignUp(SignUpRequestDto requestDto) {
        OIDCUser oidcUser = idTokenValidatorHandler.verifyIdToken(requestDto.getOAuthProvider(),
                requestDto.getIdToken());

        if (userRepository.existByOauthProviderAndOauthId(requestDto.getOAuthProvider(),
                oidcUser.getOauthId())) {
            throw new AlreadyRegisteredUserException("이미 가입된 유저입니다.");
        }
        User user = generateUser(oidcUser, requestDto);

        userRepository.save(user);
        String accessToken = jwtProvider.generateAccessToken(user);
        String refreshToken = jwtProvider.generateRefreshToken();
        user.setRefreshToken(refreshToken);

        return new SignUpResponseDto(accessToken, refreshToken);
    }

    private User generateUser(OIDCUser oidcUser, SignUpRequestDto requestDto) {
        return User.builder()
                   .gender(requestDto.getGender())
                   .nickname(requestDto.getNickname())
                   .birthDate(requestDto.getBirth())
                   .aboutMe(requestDto.getAboutMe())
                   .oAuthProvider(oidcUser.getOAuthProvider())
                   .oAuthId(oidcUser.getOauthId())
                   .email(oidcUser.getEmail())
                   .profileImageUrl(oidcUser.getProfileImageUrl())
                   .build();
    }
}
