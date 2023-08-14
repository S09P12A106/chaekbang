package com.jsix.chaekbang.domain.meeting.controller;

import com.jsix.chaekbang.domain.meeting.application.MeetingCreateUseCase;
import com.jsix.chaekbang.domain.meeting.application.MeetingSearchUseCase;
import com.jsix.chaekbang.domain.meeting.dto.MeetingCreateRequestDto;
import com.jsix.chaekbang.domain.meeting.dto.MeetingSearchResponseDto;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.config.webmvc.JwtLoginUser;
import com.jsix.chaekbang.global.dto.HttpResponse;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingCreateUseCase meetingCreateUseCase;
    private final MeetingSearchUseCase meetingSearchUseCase;

    @PostMapping("/{group_id}/meetings")
    public ResponseEntity<?> createMeeting(@JwtLoginUser AuthUser authUser,
            @PathVariable("group_id") long groupId,
            @Valid @RequestBody MeetingCreateRequestDto meetingCreateRequestDto) {
        meetingCreateUseCase.createMeeting(authUser, groupId, meetingCreateRequestDto);
        return HttpResponse.ok(HttpStatus.OK, "미팅이 생성되었습니다.");
    }

    @Validated
    @GetMapping("/{group_id}/meetings")
    public ResponseEntity<?> searchMeeting(@PathVariable("group_id") long groupId,
            @RequestParam @Min(0) int pageNum, @RequestParam @Min(1) int pageSize) {
        List<MeetingSearchResponseDto> list = meetingSearchUseCase.searchMeeting(groupId,
                pageNum, pageSize);

        return HttpResponse.okWithData(HttpStatus.OK, "미팅 조회 성공했습니다.", list);
    }
}
