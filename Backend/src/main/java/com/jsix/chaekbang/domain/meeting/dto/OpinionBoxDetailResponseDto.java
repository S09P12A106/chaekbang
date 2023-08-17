package com.jsix.chaekbang.domain.meeting.dto;

import com.jsix.chaekbang.domain.meeting.domain.OpinionBox;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class OpinionBoxDetailResponseDto {

    private Long opinionBoxId;
    private String topic;
    private List<OpinionResponseDto> opinions;

    public static OpinionBoxDetailResponseDto from(OpinionBox box) {
        return OpinionBoxDetailResponseDto.builder()
            .opinionBoxId(box.getId())
            .topic(box.getTopic())
            .opinions(box.getOpinions().stream().map(OpinionResponseDto::from)
                .collect(Collectors.toList()))
            .build();
    }
}
