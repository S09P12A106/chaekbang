package com.jsix.chaekbang.domain.user.controller;


import com.jsix.chaekbang.domain.user.application.UserSearchUseCase;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.config.webmvc.JwtLoginUser;
import com.jsix.chaekbang.global.dto.HttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserSearchUseCase userSearchUseCase;

    @GetMapping("/api/users/info")
    public ResponseEntity<?> getUserInfo(@JwtLoginUser AuthUser authUser) {
        return HttpResponse.okWithData(HttpStatus.OK, "조회 성공",
                userSearchUseCase.searchUserInfo(authUser.getUserId()));
    }

}
