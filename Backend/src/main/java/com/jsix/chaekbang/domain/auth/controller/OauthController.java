package com.jsix.chaekbang.domain.auth.controller;

import com.jsix.chaekbang.domain.auth.application.OIDCSignInUseCase;
import com.jsix.chaekbang.domain.auth.application.OIDCSignUpUseCase;
import com.jsix.chaekbang.domain.auth.application.UserWithDrawUseCase;
import com.jsix.chaekbang.domain.auth.dto.OIDCLoginResponseDto;
import com.jsix.chaekbang.domain.auth.dto.request.SignInRequestDto;
import com.jsix.chaekbang.domain.auth.dto.request.SignUpRequestDto;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.config.webmvc.JwtLoginUser;
import com.jsix.chaekbang.global.dto.HttpResponse;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OauthController {

    private final OIDCSignInUseCase OIDCSignInUseCase;
    private final OIDCSignUpUseCase oidcSignUpUseCase;
    private final UserWithDrawUseCase userWithDrawUseCase;

    @PostMapping("/api/users/sign-in")
    public ResponseEntity<?> signIn(@Valid @RequestBody SignInRequestDto requestDto) {

        OIDCLoginResponseDto oidcLoginResponseDto = OIDCSignInUseCase.oauthLogin(requestDto);

        return HttpResponse.okWithData(HttpStatus.OK, "로그인 성공", oidcLoginResponseDto);
    }

    @PostMapping("/api/users")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequestDto requestDto) {
        return HttpResponse.okWithData(HttpStatus.OK, "회원가입 성공",
                oidcSignUpUseCase.SignUp(requestDto));
    }

    @DeleteMapping("/api/users")
    public ResponseEntity<?> withdraw(@JwtLoginUser AuthUser authUser) {
        userWithDrawUseCase.withDraw(authUser.getUserId());
        return HttpResponse.ok(HttpStatus.OK, "탈퇴 성공");
    }
}
