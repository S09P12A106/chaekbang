package com.jsix.chaekbang.domain.auth.controller;


import com.jsix.chaekbang.domain.auth.application.LogoutUseCase;
import com.jsix.chaekbang.domain.auth.application.TokenRefreshUseCase;
import com.jsix.chaekbang.domain.auth.dto.RefreshResponseDto;
import com.jsix.chaekbang.domain.auth.dto.request.RefreshRequestDto;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.config.webmvc.JwtLoginUser;
import com.jsix.chaekbang.global.dto.HttpResponse;
import com.jsix.chaekbang.global.exception.InvalidInputException;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final TokenRefreshUseCase tokenRefreshUseCase;
    private final LogoutUseCase logoutUseCase;

    @PostMapping("/api/users/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request,
            @RequestBody RefreshRequestDto body) {
        String accessToken = extractAccessToken(request);
        String refreshToken = body.getRefreshToken();
        RefreshResponseDto result = tokenRefreshUseCase.refresh(accessToken, refreshToken);
        return HttpResponse.okWithData(HttpStatus.OK, "리프레쉬 성공", result);
    }


    @PostMapping("/api/users/logout")
    public ResponseEntity<?> logout(@JwtLoginUser AuthUser authUser) {
        logoutUseCase.logout(authUser.getUserId());
        return HttpResponse.ok(HttpStatus.OK, "로그아웃 성공");
    }

    private String extractAccessToken(HttpServletRequest request) {
        final String AUTHORIZATION_HEADER = "Authorization";
        final String HEADER_PREFIX = "Bearer";
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(HEADER_PREFIX)) {
            return bearerToken.substring(HEADER_PREFIX.length());
        }
        throw new InvalidInputException("헤더에 토큰이 없습니다.");
    }
}
