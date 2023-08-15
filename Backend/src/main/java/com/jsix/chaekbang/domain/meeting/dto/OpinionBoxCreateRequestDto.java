package com.jsix.chaekbang.domain.meeting.dto;

import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.meeting.domain.OpinionBox;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OpinionBoxCreateRequestDto {

    @NotBlank(message = "주제를 입력해주세요.")
    @Size(max = 100, message = "주제는 최대 100자 입니다.")
    private String topic;

    public OpinionBox toOpinionBoxEntity(Meeting meeting) {
        return OpinionBox.createOpinionBox(topic, meeting);
    }

}
