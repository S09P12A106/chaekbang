package com.jsix.chaekbang.domain.meeting.dto.socket;

import com.jsix.chaekbang.domain.meeting.domain.Vote;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreateVoteRequestDto {

    private String title;
    private List<String> contents;
    private Boolean isAnonymous;

    public Vote toEntity(Long userId, Long meetingId) {
        return Vote.createVote(title, meetingId, contents, userId, isAnonymous);
    }
}
