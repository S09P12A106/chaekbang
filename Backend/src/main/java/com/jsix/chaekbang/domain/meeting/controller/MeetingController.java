package com.jsix.chaekbang.domain.meeting.controller;

import com.jsix.chaekbang.domain.meeting.application.MeetingCreateUseCase;
import com.jsix.chaekbang.domain.meeting.application.MeetingSearchUseCase;
import com.jsix.chaekbang.domain.meeting.application.OpinionBoxCreateUseCase;
import com.jsix.chaekbang.domain.meeting.application.OpinionCreateUseCase;
import com.jsix.chaekbang.domain.meeting.application.SessionUseCase;
import com.jsix.chaekbang.domain.meeting.application.OpinionSearchUseCase;
import com.jsix.chaekbang.domain.meeting.dto.MeetingCreateRequestDto;
import com.jsix.chaekbang.domain.meeting.dto.MeetingSearchResponseDto;
import com.jsix.chaekbang.domain.meeting.dto.OpinionBoxCreateRequestDto;
import com.jsix.chaekbang.domain.meeting.dto.OpinionCreateRequestDto;
import com.jsix.chaekbang.domain.meeting.dto.SessionInitRequestDto;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.config.webmvc.JwtLoginUser;
import com.jsix.chaekbang.global.dto.HttpResponse;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
    private final SessionUseCase sessionUseCase;

    @Value("${openvidu.url}")
    private String OPENVIDU_URL;

    @Value("${openvidu.secret}")
    private String OPENVIDU_SECRET;
    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }
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

    @Validated
    @GetMapping("/{group_id}/meetings/{meetingId}")
    public ResponseEntity<?> getMeetingOne(@PathVariable("group_id") long groupId,
        @PathVariable("meetingId") Long meetingId) {
        return HttpResponse.okWithData(HttpStatus.OK, "미팅 조회 성공했습니다.",
            meetingSearchUseCase.getDetail(meetingId));
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

    @GetMapping("/meetings/{meeting_id}/session-id")
    public ResponseEntity<?> searchSessionId(@JwtLoginUser AuthUser authUser,
            @PathVariable("meeting_id") long meetingId) {
        String sessionId = meetingCreateUseCase.makeSessionId(meetingId);
        return HttpResponse.okWithData(HttpStatus.OK, "세션ID 조회 성공했습니다.", sessionId);
    }

    /*
     * params - (key, value) = (customSessionId, sessionId) - params 를 Map으로 받는 것과 key가
     * customSessionId 인 부분은 openvidu 라이브러리에서 정해진 것
     */
    @PostMapping("/meetings/sessions")
    public ResponseEntity<String> initializeSession(@JwtLoginUser AuthUser authUser,
            @RequestBody(required = false) @Valid SessionInitRequestDto sessionInitRequestDto)
            throws OpenViduJavaClientException, OpenViduHttpException {

        String sessionId = sessionUseCase.createSession(openvidu, authUser, sessionInitRequestDto);

        return new ResponseEntity<>(sessionId, HttpStatus.OK);
    }

    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/meetings/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
            @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }


    @GetMapping("/{group_id}/meetings/{meeting_id}/opinions")
    public ResponseEntity<?> searchOpinion(@JwtLoginUser AuthUser authUser,
            @PathVariable("group_id") long groupId, @PathVariable("meeting_id") long meetingId) {
        return HttpResponse.okWithData(HttpStatus.OK, "의견 목록 조회 성공했습니다.",
                opinionSearchUseCase.searchOpinion(authUser, meetingId));
    }
}
