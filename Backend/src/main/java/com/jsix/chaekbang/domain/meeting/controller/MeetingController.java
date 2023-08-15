package com.jsix.chaekbang.domain.meeting.controller;

import com.jsix.chaekbang.domain.meeting.application.MeetingCreateUseCase;
import com.jsix.chaekbang.domain.meeting.application.MeetingSearchUseCase;
import com.jsix.chaekbang.domain.meeting.application.OpinionBoxCreateUseCase;
import com.jsix.chaekbang.domain.meeting.application.OpinionCreateUseCase;
import com.jsix.chaekbang.domain.meeting.application.OpinionSearchUseCase;
import com.jsix.chaekbang.domain.meeting.dto.MeetingCreateRequestDto;
import com.jsix.chaekbang.domain.meeting.dto.MeetingSearchResponseDto;
import com.jsix.chaekbang.domain.meeting.dto.OpinionBoxCreateRequestDto;
import com.jsix.chaekbang.domain.meeting.dto.OpinionCreateRequestDto;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.config.webmvc.JwtLoginUser;
import com.jsix.chaekbang.global.dto.HttpResponse;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
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
    private final OpinionBoxCreateUseCase opinionBoxCreateUseCase;
    private final OpinionCreateUseCase opinionCreateUseCase;
    private final OpinionSearchUseCase opinionSearchUseCase;

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

    @PostMapping("/{group_id}/meetings/{meeting_id}/opinion-box")
    public ResponseEntity<?> createOpinionBox(@JwtLoginUser AuthUser authUser,
            @PathVariable("group_id") long groupId,
            @PathVariable("meeting_id") long meetingId,
            @Valid @RequestBody OpinionBoxCreateRequestDto opinionBoxCreateRequestDto) {
        return HttpResponse.okWithData(HttpStatus.OK, "의견함이 생성되었습니다.",
                opinionBoxCreateUseCase.createOpinionBox(authUser, groupId, meetingId,
                        opinionBoxCreateRequestDto));
    }

    @PostMapping("/{group_id}/meetings/{meeting_id}/opinion-box/{opinion_box_id}/opinion")
    public ResponseEntity<?> createOpinion(@JwtLoginUser AuthUser authUser,
            @PathVariable("group_id") long groupId, @PathVariable("meeting_id") long meetingId,
            @PathVariable("opinion_box_id") long opinionBoxId,
            @Valid @RequestBody OpinionCreateRequestDto opinionCreateRequestDto) {
        opinionCreateUseCase.createOpinion(authUser, groupId, meetingId, opinionBoxId,
                opinionCreateRequestDto);
        return HttpResponse.ok(HttpStatus.OK, "의견이 생성되었습니다.");
    }

    @GetMapping("/{group_id}/meetings/{meeting_id}/opinions")
    public ResponseEntity<?> searchOpinion(@JwtLoginUser AuthUser authUser,
            @PathVariable("group_id") long groupId, @PathVariable("meeting_id") long meetingId) {
        return HttpResponse.okWithData(HttpStatus.OK, "의견 목록 조회 성공했습니다.",
                opinionSearchUseCase.searchOpinion(authUser, meetingId));
    }
}
