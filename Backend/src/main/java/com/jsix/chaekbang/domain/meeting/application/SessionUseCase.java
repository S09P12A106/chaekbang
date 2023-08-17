package com.jsix.chaekbang.domain.meeting.application;

import com.jsix.chaekbang.domain.meeting.application.repository.MeetingRepository;
import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.meeting.domain.SessionIdValidator;
import com.jsix.chaekbang.domain.meeting.dto.SessionInitRequestDto;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class SessionUseCase {

    private final UserRepository userRepository;
    private final MeetingRepository meetingRepository;
    private final SessionIdValidator sessionIdValidator;

    public String createSession(OpenVidu openvidu, AuthUser authUser,
            SessionInitRequestDto sessionInitRequestDto)
            throws OpenViduJavaClientException, OpenViduHttpException {
        // sessionId 검증
        sessionIdValidator.validate(sessionInitRequestDto.getCustomSessionId());

        // 현재 접속을 요청한 사람의 데이터를 가져온다.
        User user = userRepository.findById(authUser.getUserId())
                                  .orElseThrow(
                                          () -> new NotFoundResourceException("유저를 찾을 수 없습니다."));

        // sessionId 로부터 meetingId를 가져온다.
        Long meetingId = sessionIdValidator.getIdFromSessionId(
                sessionInitRequestDto.getCustomSessionId());

        // 해당 미팅의 정보를 가져와서, 그 안의 그룹에서 위의 유저가 있는지 검색한다.
        Meeting meeting = meetingRepository.findMeetingById(meetingId);
        meeting.validateUser(user);

        // 인증이 완료되면 세션을 생성해서 준다.
        SessionProperties properties = SessionProperties.fromJson(sessionInitRequestDto.toMap())
                                                        .build();
        Session session = openvidu.createSession(properties);

        // sessionId를 반환한다.
        return session.getSessionId();
    }
}
