package com.jsix.chaekbang.domain.meeting.dto.socket;

import com.jsix.chaekbang.domain.meeting.domain.Vote;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class VoteResponseDto {

    private String voteId;
    private String title;
    private List<String> contents;
    private boolean active;
    private Boolean isAnonymous;
    private List<VoteUserResponseDto>[] result;
    private List<Long> users;
    private Long creator;

    @Builder
    public VoteResponseDto(String voteId, String title, List<String> contents, boolean active,
        Boolean isAnonymous, List<VoteUserResponseDto>[] result, List<Long> users,
        Long creator) {
        this.voteId = voteId;
        this.title = title;
        this.contents = contents;
        this.active = active;
        this.isAnonymous = isAnonymous;
        this.result = result;
        this.users = users;
        this.creator = creator;
    }


    public static VoteResponseDto from(Vote vote) {
        List<Long> users = new ArrayList<>();
        List<VoteUserResponseDto>[] lists = initResult(vote.getContents().size());

        vote.getUserVotes().forEach((voteSelect -> {
            lists[voteSelect.getIndex()].add(VoteUserResponseDto.from(voteSelect));
            users.add(voteSelect.getUserId());
        }));

        return VoteResponseDto.builder()
            .voteId(vote.getVoteId())
            .title(vote.getTitle())
            .contents(vote.getContents())
            .active(vote.isActive())
            .users(users)
            .result(lists)
            .isAnonymous(vote.isAnonymous())
            .creator(vote.getCreator())
            .build();
    }

    private static List<VoteUserResponseDto>[] initResult(int length) {
        List<VoteUserResponseDto>[] results = new List[length];
        for (int i = 0; i < length; i++) {
            results[i] = new ArrayList<>();
        }
        return results;
    }
}
