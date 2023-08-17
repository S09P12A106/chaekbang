package com.jsix.chaekbang.domain.meeting.dto.socket;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MeetingNotificationDto {

    private String type;
    private String message;


    public static MeetingNotificationDto waringNoti() {
        return new MeetingNotificationDto("WARNING", "10분뒤 종료됩니다.");
    }

    public static MeetingNotificationDto closeNoti() {
        return new MeetingNotificationDto("CLOSE", "미팅방이 종료됩니다.");
    }


}
