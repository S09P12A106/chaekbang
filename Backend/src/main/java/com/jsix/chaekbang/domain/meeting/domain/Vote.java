package com.jsix.chaekbang.domain.meeting.domain;


import com.jsix.chaekbang.global.exception.BusinessException;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

/*
 *  도메인 객체지만 MySQL이 아닌 Redis 에 저장.
 */
@Getter
@NoArgsConstructor
@RedisHash("vote")
@ToString
public class Vote {

    @Id
    private String voteId;

    private String title;

    @Indexed
    private Long meetingId;
    private List<String> contents = new ArrayList<>();

    private boolean isActive;

    private boolean isAnonymous;

    private Long creator;

    private List<UserVote> userVotes = new ArrayList<>();


    @Builder
    public Vote(String title, Long meetingId, List<String> contents, boolean isActive,
        boolean isAnonymous, Long creator) {
        this.title = title;
        this.meetingId = meetingId;
        this.contents = contents;
        this.isActive = isActive;
        this.isAnonymous = isAnonymous;
        this.creator = creator;
    }

    public static Vote createVote(String title, Long meetingId, List<String> contents,
        Long userId, boolean isAnonymous) {
        return Vote.builder()
            .title(title)
            .meetingId(meetingId)
            .contents(contents)
            .isActive(true)
            .isAnonymous(isAnonymous)
            .creator(userId)
            .build();
    }


    //투표하기
    public void vote(ConnectUser user, int index) {
        if (!isActive) {
            throw new BusinessException(409, "종료된 투표입니다.");
        }
        if (isAlreadyVoted(user.getUserId())) {
            throw new BusinessException(409, "이미 투표를 진행했습니다.");
        }
        this.userVotes.add(new UserVote(index, user.getUserId(), user.getNickname(),
            user.getProfileImageUrl()));
    }


    //투표 종료
    public void close(Long userId) {
        if (!creator.equals(userId)) {
            throw new BusinessException(403, "투표 종료 권한이 없습니다");
        }
        if (!isActive) {
            throw new BusinessException(409, "종료된 투표입니다.");
        }
        this.isActive = false;
    }

    private boolean isAlreadyVoted(Long userId) {
        return userVotes.stream()
            .anyMatch((userVote) -> userVote.getUserId().equals(userId));
    }
}
