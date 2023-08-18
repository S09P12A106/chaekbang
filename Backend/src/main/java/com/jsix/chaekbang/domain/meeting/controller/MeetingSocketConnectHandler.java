package com.jsix.chaekbang.domain.meeting.controller;

import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.meeting.application.repository.ConnectUserRepository;
import com.jsix.chaekbang.domain.meeting.application.repository.MeetingRepository;
import com.jsix.chaekbang.domain.meeting.application.repository.MeetingUserRepository;
import com.jsix.chaekbang.domain.meeting.domain.ConnectUser;
import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.meeting.domain.MeetingUser;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.config.stomp.SocketAuthUser;
import com.jsix.chaekbang.global.exception.BusinessException;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import com.jsix.chaekbang.global.util.STOMPUtils;
import java.net.Socket;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Component
@Transactional
@RequiredArgsConstructor
public class MeetingSocketConnectHandler implements ChannelInterceptor {

    private final MeetingRepository meetingRepository;
    private final MeetingUserRepository meetingUserRepository;

    private final ConnectUserRepository connectUserRepository;
    private final UserRepository userRepository;


    /*
     *  연결 요청 전 해당 미팅이 접근 가능한지 판단한다.
     *  1. 종료되지 않은 요청인지.
     *  2. 이미 다른 세션이 접근해 있는지.
     *  3. 접근 가능하면 Redis에 세션 정보를 저장한다.
     */
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message,
            StompHeaderAccessor.class);

        if (STOMPUtils.isSTOMPConnectionRequest(accessor)) {
            SocketAuthUser user = getUser(accessor);

            if (isAlreadyConnectUser(user.getUserId(), user.getMeetingId())) {
                log.error("이미 접속된 정보입니다, {} ", user);
                throw new BusinessException(409, "이미 접속된 정보입니다.");
            }

            Meeting meeting = getMeetingById(user.getMeetingId());

            if (meeting.isClose()) {
                log.error("이미 종료된 미팅입니다, {} ", user);
                throw new BusinessException(409, "이미 종료된 미팅입니다.");
            }

            User dataBaseUser = getUserById(user.getUserId());
            Group group = meeting.getGroup();// lazy loading
            // 정상 처리 되면 Redis에 Connect User 저장.
            ConnectUser connectUser = ConnectUser.builder()
                .sessionId(user.getSessionId())
                .userId(user.getUserId())
                .nickname(dataBaseUser.getNickname())
                .profileImageUrl(dataBaseUser.getProfileImageUrl())
                .meetingId(user.getMeetingId())
                .isLeader(group.getLeaderId().equals(user.getUserId()))
                .connectedTime(LocalDateTime.now())
                .build();
            connectUserRepository.save(connectUser);
        }

        return ChannelInterceptor.super.preSend(message, channel);
    }

    private boolean isAlreadyConnectUser(Long userId, Long meetingId) {
        List<ConnectUser> connectUsers = connectUserRepository.findAllByMeetingId(meetingId);
        return connectUsers.stream().anyMatch((user) -> user.getUserId().equals(userId));
    }

    @Override
    public void afterSendCompletion(Message<?> message, MessageChannel channel, boolean sent,
        Exception ex) {
        ChannelInterceptor.super.afterSendCompletion(message, channel, sent, ex);

        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message,
            StompHeaderAccessor.class);

        if (STOMPUtils.isSTOMPDisconnectionRequest(accessor)) {
            SocketAuthUser socketAuthUser = getUser(accessor);

            Optional<ConnectUser> connectUserOptional = connectUserRepository.findBySessionId(
                socketAuthUser.getSessionId());

            // 비정상 요청으로 커넥션이 실패한 경우
            if (connectUserOptional.isEmpty()) {
                log.warn("비정상 종료 유저입니다, {}", socketAuthUser);
                return;
            }

            // 커넥션이 정상 성공한 후 종료되는 경우, 현재 정보를 업데이트 해준다.
            User user = getUserById(socketAuthUser.getUserId());
            Meeting meeting = getMeetingById(socketAuthUser.getMeetingId());
            updateMeetingUser(connectUserOptional.get(), user, meeting);
            connectUserRepository.delete(connectUserOptional.get());

        }

    }

    private void updateMeetingUser(ConnectUser connectUser, User user, Meeting meeting) {
        if (meeting.isClose()) {
            return;
        }
        Optional<MeetingUser> meetingAndUser = meetingUserRepository.findByMeetingAndUser(
            meeting, user);
        MeetingUser meetingUser = null;
        if (meetingAndUser.isPresent()) {
            meetingUser = meetingAndUser.get();
            meetingUser.updateLeftAt(LocalDateTime.now());
        } else {
            meetingUser = MeetingUser.builder()
                .user(user)
                .meeting(meeting)
                .enteredAt(connectUser.getConnectedTime())
                .leftAt(LocalDateTime.now())
                .build();
        }
        meetingUserRepository.save(meetingUser);
        log.info("Meeting User update Success");
    }

    private SocketAuthUser getUser(StompHeaderAccessor accessor) {
        SocketAuthUser simpUser = (SocketAuthUser) accessor.getHeader("simpUser");
        return simpUser;
    }


    private User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new NotFoundResourceException("해당 유저를 찾을 수 없습니다."));
    }

    private Meeting getMeetingById(Long id) {
        return meetingRepository.findById(id)
            .orElseThrow(() -> new NotFoundResourceException("해당 미팅을 찾을 수 없습니다."));
    }
}
