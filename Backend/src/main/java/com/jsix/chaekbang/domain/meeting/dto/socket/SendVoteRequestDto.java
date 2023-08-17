package com.jsix.chaekbang.domain.meeting.dto.socket;

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
public class SendVoteRequestDto {

    private String voteId;
    private Integer selectedItemIndex;


}
