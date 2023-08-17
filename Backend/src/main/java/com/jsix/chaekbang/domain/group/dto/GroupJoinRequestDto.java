package com.jsix.chaekbang.domain.group.dto;

import static io.lettuce.core.pubsub.PubSubOutput.Type.message;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Getter;

@Getter
public class GroupJoinRequestDto {

    @NotBlank
    @Size(max = 200, message = "답변의 길이는 200자 이하여야 합니다.")
    private String answer;
}
