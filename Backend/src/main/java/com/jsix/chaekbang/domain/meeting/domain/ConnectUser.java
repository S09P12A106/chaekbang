package com.jsix.chaekbang.domain.meeting.domain;


import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

/*
 *  Reids에 Meeting Id 기준으로 연결되면 Redis에 저장되는 세션 객체
 */
@Getter
@NoArgsConstructor
@RedisHash("connectUser")
public class ConnectUser {
    @Id
    private String sessionId;
    private Long userId;
    private String nickname;
    private String profileImageUrl;
    @Indexed
    private Long meetingId;
    private Boolean isLeader;
    private LocalDateTime connectedTime;

    @Builder

    public ConnectUser(String sessionId, Long userId, String nickname, String profileImageUrl,
        Long meetingId, Boolean isLeader, LocalDateTime connectedTime) {
        this.sessionId = sessionId;
        this.userId = userId;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.meetingId = meetingId;
        this.isLeader = isLeader;
        this.connectedTime = connectedTime;
    }
}

