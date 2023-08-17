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
public class SendEmojiRequestDto {

    private String emoji;
    private String nickname;
}
