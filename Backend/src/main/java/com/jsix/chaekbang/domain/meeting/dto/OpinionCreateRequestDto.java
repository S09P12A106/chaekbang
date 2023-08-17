package com.jsix.chaekbang.domain.meeting.dto;

import com.jsix.chaekbang.domain.meeting.domain.Opinion;
import com.jsix.chaekbang.domain.meeting.domain.OpinionBox;
import com.jsix.chaekbang.domain.user.domain.User;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OpinionCreateRequestDto {

    @NotBlank(message = "의견을 입력해주세요.")
    @Size(max = 100, message = "의견은 최대 100자 입니다.")
    private String opinion;

    public Opinion toOpinionEntity(OpinionBox opinionBox, User user) {
        return Opinion.createOpinion(this.opinion, opinionBox, user);
    }
}
