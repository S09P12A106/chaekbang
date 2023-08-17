package com.jsix.chaekbang.domain.meeting.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import java.time.LocalDateTime;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MeetingCreateRequestDto {

    @NotBlank(message = "책방명을 입력해주세요.")
    @Size(max = 50, message = "책방명의 최대 길이는 50글자입니다.")
    private String title;

    @NotNull(message = "시작 날짜, 시간을 입력해주세요.")
    @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    @Future(message = "시작 날짜는 미래의 날짜여야 합니다.")
    private LocalDateTime startedAt;

    public Meeting toMeetingEntity(Group group) {
        return Meeting.createMeeting(title, startedAt, group);
    }
}
