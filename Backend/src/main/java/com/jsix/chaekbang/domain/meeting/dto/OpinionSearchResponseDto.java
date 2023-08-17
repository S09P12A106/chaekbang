package com.jsix.chaekbang.domain.meeting.dto;

import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.meeting.domain.Opinion;
import com.jsix.chaekbang.domain.meeting.domain.OpinionBox;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
public class OpinionSearchResponseDto {

    private long opinionBoxId;
    private String topic;
    private List<String> opinions;

    public static OpinionSearchResponseDto createFromMeeting(OpinionBox opinionBox) {
        return OpinionSearchResponseDto.builder()
                .opinionBoxId(opinionBox.getId())
                .topic(opinionBox.getTopic())
                .opinions(opinionBox.getOpinions().stream().map(opinion -> fromOpinion(opinion))
                                    .toList())
                .build();
    }

    private static String fromOpinion(Opinion opinion) {
        return opinion.getOpinion();
    }

}
