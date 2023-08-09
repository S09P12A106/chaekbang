package com.jsix.chaekbang.domain.meeting.controller;

import com.jsix.chaekbang.domain.meeting.application.MeetingCreateUseCase;
import com.jsix.chaekbang.domain.meeting.dto.MeetingCreateRequestDto;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.config.webmvc.JwtLoginUser;
import com.jsix.chaekbang.global.dto.HttpResponse;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingCreateUseCase meetingCreateUseCase;

    @PostMapping("/{group_id}/meetings")
    public ResponseEntity<?> createMeeting(@JwtLoginUser AuthUser authUser,
            @PathVariable("group_id") long groupId,
            @Valid @RequestBody MeetingCreateRequestDto meetingCreateRequestDto) {
        meetingCreateUseCase.createMeeting(authUser, groupId, meetingCreateRequestDto);
        return HttpResponse.ok(HttpStatus.OK, "미팅이 생성되었습니다.");
    }
}
