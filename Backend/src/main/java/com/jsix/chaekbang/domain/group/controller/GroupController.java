package com.jsix.chaekbang.domain.group.controller;

import com.jsix.chaekbang.domain.group.application.GroupCreateUseCase;
import com.jsix.chaekbang.domain.group.dto.GroupCreateRequestDto;
import com.jsix.chaekbang.global.dto.HttpResponse;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupCreateUseCase groupCreateUseCase;

    @PostMapping
    public ResponseEntity<?> createGroup(
            @RequestBody @Valid GroupCreateRequestDto groupCreateRequestDto) {
        Long leaderId = 1L;
        groupCreateUseCase.createGroup(leaderId, groupCreateRequestDto);
        return HttpResponse.ok(HttpStatus.CREATED, "모임이 생성되었습니다.");
    }
}
