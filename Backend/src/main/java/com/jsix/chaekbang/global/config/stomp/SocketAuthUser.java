package com.jsix.chaekbang.global.config.stomp;


import com.jsix.chaekbang.domain.meeting.domain.ConnectUser;
import com.jsix.chaekbang.domain.user.domain.User;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class SocketAuthUser implements Principal {

    private Long userId;
    private Long meetingId;
    private String sessionId;


    @Builder
    public SocketAuthUser(Long userId, Long meetingId, String sessionId) {
        this.userId = userId;
        this.meetingId = meetingId;
        this.sessionId = sessionId;
    }



    // AuthSocketHandler을 통과해서 만들어진 인증 객체
    public static SocketAuthUser authenticatedUser(Long userId, Long meetingId, String sessionId) {
        return SocketAuthUser.builder()
            .userId(userId)
            .meetingId(meetingId)
            .sessionId(sessionId)
            .build();
    }

//    public static SocketAuthUser from(User user, String sessionId, Long meetingId,
//        Boolean isLeader, LocalDateTime now) {
//        return SocketAuthUser.builder()
//            .userId(user.getId())
//            .nickname(user.getNickname())
//            .profileImageUrl(user.getProfileImageUrl())
//            .sessionId(sessionId)
//            .meetingId(meetingId)
//            .isLeader(isLeader)
//            .connectedTime(now)
//            .build();
//    }

//    public ConnectUser toConnectUser() {
//        return new ConnectUser(this.userId, this.nickname, this.profileImageUrl, this.sessionId,
//            this.meetingId, this.connectedTime);
//    }

    @Override
    public String getName() {
        return sessionId;
    }
}
