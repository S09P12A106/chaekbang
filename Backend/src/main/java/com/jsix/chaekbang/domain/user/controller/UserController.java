package com.jsix.chaekbang.domain.user.controller;


import com.jsix.chaekbang.domain.user.application.UserModifyUseCase;
import com.jsix.chaekbang.domain.user.application.UserSearchUseCase;
import com.jsix.chaekbang.domain.user.dto.UserModifyRequestDto;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.config.webmvc.JwtLoginUser;
import com.jsix.chaekbang.global.dto.HttpResponse;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserSearchUseCase userSearchUseCase;
    private final UserModifyUseCase userModifyUseCase;

    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo(@JwtLoginUser AuthUser authUser) {
        return HttpResponse.okWithData(HttpStatus.OK, "내 정보 조회 성공했습니다.",
                userSearchUseCase.searchUserInfo(authUser.getUserId()));
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<?> getUserInfoByUserId(@PathVariable("user_id") long userId) {
        return HttpResponse.okWithData(HttpStatus.OK, "유저 정보 조회 성공했습니다.",
                userSearchUseCase.searchUserInfoByUserId(userId));
    }

    @PatchMapping
    public ResponseEntity<?> modifyUser(@JwtLoginUser AuthUser authUser,
    @ModelAttribute @Valid UserModifyRequestDto userModifyRequestDto) {
        userModifyUseCase.modifyUser(authUser, userModifyRequestDto);
        return HttpResponse.ok(HttpStatus.OK, "유저 수정 성공했습니다.");
    }


}
