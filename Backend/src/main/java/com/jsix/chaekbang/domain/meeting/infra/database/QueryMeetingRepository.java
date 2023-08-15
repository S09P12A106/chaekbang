package com.jsix.chaekbang.domain.meeting.infra.database;

import com.jsix.chaekbang.domain.group.domain.QGroup;
import com.jsix.chaekbang.domain.meeting.domain.QMeeting;
import com.jsix.chaekbang.domain.meeting.dto.MeetingSearchResponseDto;
import com.jsix.chaekbang.domain.meeting.dto.QMeetingSearchResponseDto;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QueryMeetingRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private QMeeting meeting = QMeeting.meeting;
    private QGroup group = QGroup.group;

    public List<MeetingSearchResponseDto> findByGroupIdWithSlicing(long groupId,
            Pageable pageable) {
        return jpaQueryFactory.select(
                                      new QMeetingSearchResponseDto(meeting.id, meeting.title, meeting.startedAt,
                                              meeting.closedAt)
                              )
                              .from(meeting)
                              .offset(pageable.getOffset())
                              .where(meeting.group.id.eq(groupId))
                              .orderBy(meeting.startedAt.desc())
                              .orderBy(meeting.closedAt.desc())
                              .limit(pageable.getPageSize())
                              .fetch();
    }

    public Long findNotClosedMeetingCountByGroupId(long groupId) {
        return jpaQueryFactory.select(meeting.count())
                              .from(meeting)
                              .where(meeting.closedAt.isNull()
                                      .and(meeting.group.id.eq(groupId)))
                              .fetchOne();
    }

}
