package com.jsix.chaekbang.domain.meeting.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserVote {

    private int index;
    private Long userId;
    private String nickname;
    private String profileImageUrl;
}
