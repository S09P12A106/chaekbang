package com.jsix.chaekbang.domain.meeting.dto;

import com.querydsl.core.annotations.QueryProjection;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.Getter;

@Getter
public class MeetingSearchResponseDto {

    private Long id;
    private String title;
    private String startedAt;
    private String closedAt;

    @QueryProjection
    public MeetingSearchResponseDto(Long id, String title, LocalDateTime startedAt, LocalDateTime closedAt) {
        this.id = id;
        this.title = title;
        this.startedAt = startedAt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.closedAt = closedAt == null ? null : closedAt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
