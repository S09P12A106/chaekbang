package com.jsix.chaekbang.domain.meeting.dto.socket;


import com.jsix.chaekbang.domain.meeting.domain.ConnectUser;
import com.jsix.chaekbang.domain.meeting.domain.UserVote;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class VoteUserResponseDto {

    private Long userId;
    private String nickname;
    private String profileImage;

    public static VoteUserResponseDto from(UserVote userVote) {
        return new VoteUserResponseDto(userVote.getUserId(), userVote.getNickname(),
            userVote.getProfileImageUrl());
    }
}
