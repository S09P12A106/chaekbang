package com.jsix.chaekbang.domain.meeting.dto;

import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.user.dto.UserInfoResponseDto;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Setter
public class MeetingDetailResponseDto {

    private Long meetingId;
    private String title;
    private LocalDateTime startedAt;
    private LocalDateTime closedAt;
    private List<UserInfoResponseDto> participation = new ArrayList<>();
    private List<OpinionBoxDetailResponseDto> opinionBoxes = new ArrayList<>();


    public static MeetingDetailResponseDto from(Meeting meeting) {

        List<UserInfoResponseDto> userinfos = new ArrayList<>();

        if (meeting.getMeetingUsers().size() > 0) {
            System.out.println(meeting.getMeetingUsers());
            System.out.println(meeting.getMeetingUsers().get(0).getUser());
            userinfos = meeting.getMeetingUsers().stream()
                .map((m) -> UserInfoResponseDto.from(m.getUser())).toList();
        }

        List<OpinionBoxDetailResponseDto> opinionBoxDetailResponseDtos = new ArrayList<>();
        if (meeting.getOpinionBoxes().size() > 0) {
            meeting.getOpinionBoxes()
                .stream()
                .map(OpinionBoxDetailResponseDto::from).toList();
        }

        return MeetingDetailResponseDto.builder()
            .meetingId(meeting.getId())
            .title(meeting.getTitle())
            .startedAt(meeting.getStartedAt())
            .closedAt(meeting.getClosedAt())
            .participation(userinfos)
            .opinionBoxes(opinionBoxDetailResponseDtos)
            .build();
    }
}
