package com.jsix.chaekbang.domain.auth.controller;

import com.jsix.chaekbang.domain.auth.application.OIDCLoginUseCase;
import com.jsix.chaekbang.domain.auth.dto.OIDCLoginResponseDto;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.global.dto.HttpResponse;
import com.jsix.chaekbang.global.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OauthController {

    private final OIDCLoginUseCase OIDCLoginUseCase;

    @PostMapping("/api/users/sign-in")
    public ResponseEntity<?> kakaoLogin(@RequestParam("oauthProvider") String oauthProvider,
            @RequestParam("idToken") String idToken, @RequestParam("isLoginKeep") Boolean isLoginKeep) {

        OAuthProvider provider = OAuthProvider.of(oauthProvider);

        OIDCLoginResponseDto oidcLoginResponseDto = OIDCLoginUseCase.oauthLogin(provider,
                idToken, isLoginKeep);
        return HttpResponse.okWithData(HttpStatus.ACCEPTED, "", oidcLoginResponseDto);
    }

}
