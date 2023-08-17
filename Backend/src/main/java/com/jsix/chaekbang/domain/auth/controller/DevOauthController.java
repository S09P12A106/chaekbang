package com.jsix.chaekbang.domain.auth.controller;


import com.jsix.chaekbang.domain.auth.application.DevelopLoginHelper;
import com.jsix.chaekbang.domain.auth.dto.request.SignInRequestDto;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.global.dto.HttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DevOauthController {

    private final Environment environment;
    private final DevelopLoginHelper developLoginHelper;

    @PostMapping("/api/dev/oauth")
    private ResponseEntity<?> devLogin(@RequestParam("oauthId") String oauthId) {
        if (!isLocalProfiles(environment.getActiveProfiles())) {
            return HttpResponse.fail(HttpStatus.FORBIDDEN, "실행할 권한이 없습니다.");
        }

        return HttpResponse.okWithData(HttpStatus.OK, "개발용 로그인",
                developLoginHelper.login(new SignInRequestDto(
                        OAuthProvider.KAKAO, oauthId, true)));
    }

    private boolean isLocalProfiles(String[] profiles) {
        for (String profile : profiles) {
            if (!profile.equals("local")) {
                return false;
            }
        }
        return true;
    }

}
