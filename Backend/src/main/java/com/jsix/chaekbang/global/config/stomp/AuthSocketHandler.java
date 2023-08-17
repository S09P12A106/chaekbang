package com.jsix.chaekbang.global.config.stomp;


import com.jsix.chaekbang.domain.auth.application.jwt.JwtProvider;
import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.global.exception.AuthenticationFailException;
import com.jsix.chaekbang.global.exception.InvalidInputException;
import com.jsix.chaekbang.global.util.STOMPUtils;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/*
 *  JWT 인증 검사 수행 후 인증된 객체만 넘어간다.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class AuthSocketHandler implements ChannelInterceptor {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String MEETING_ID_HEADER = "meeting";
    private static final String HEADER_PREFIX = "Bearer ";
    private final JwtProvider jwtProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message,
            StompHeaderAccessor.class);
        StompCommand command = accessor.getCommand();
        String sessionId = accessor.getSessionId();
        String destination = accessor.getDestination();

        if (command != null) {
            log.info("[커맨드] = " + command + " [URL] " + destination + "  Session = " + sessionId);
        }

        // STOMP Connection 연결일 때
        if (STOMPUtils.isSTOMPConnectionRequest(accessor)) {
            String token = extractToken(accessor);
            validateAccessToken(token);
            Claims claims = jwtProvider.getClaims(token);
            Long userId = Long.valueOf(claims.getSubject());
            Long meetingId = getMeetingIdFromHeader(accessor);

            SocketAuthUser socketAuthUser = SocketAuthUser.authenticatedUser(userId, meetingId,
                sessionId);
            log.info("[CONNECT] " + socketAuthUser);
            accessor.setUser(socketAuthUser);
        }

        return ChannelInterceptor.super.preSend(message, channel);
    }

    private void validateAccessToken(String token) {
        if (token == null || !jwtProvider.validateAccessToken(token)) {
            throw new AuthenticationFailException("JWT ERROR");
        }
    }

    private Long getMeetingIdFromHeader(StompHeaderAccessor accessor) {
        String meetingId = accessor.getFirstNativeHeader(MEETING_ID_HEADER);
        if (StringUtils.hasText(meetingId)) {
            return Long.valueOf(meetingId);
        }
        throw new InvalidInputException("잘못된 값");
    }

    private String extractToken(StompHeaderAccessor accessor) {
        String bearerToken = accessor.getFirstNativeHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(HEADER_PREFIX)) {
            return bearerToken.substring(HEADER_PREFIX.length());
        }
        return null;
    }
}
