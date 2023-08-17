package com.jsix.chaekbang.domain.meeting.dto;


import com.jsix.chaekbang.domain.meeting.domain.Opinion;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OpinionResponseDto {

    private Long opinionId;
    private String opinion;
    private Long userId;
    private String nickname;
    private String profileImageUrl;

    public static OpinionResponseDto from(Opinion opinion) {
        return OpinionResponseDto.builder()
            .opinionId(opinion.getId())
            .opinion(opinion.getOpinion())
            .userId(opinion.getUser().getId())
            .nickname(opinion.getUser().getNickname())
            .profileImageUrl(opinion.getUser().getProfileImageUrl())
            .build();
    }
}
