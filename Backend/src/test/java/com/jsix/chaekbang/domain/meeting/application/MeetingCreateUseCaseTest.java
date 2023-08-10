package com.jsix.chaekbang.domain.meeting.application;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.meeting.application.repository.MeetingRepository;
import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.meeting.dto.MeetingCreateRequestDto;
import com.jsix.chaekbang.domain.user.domain.Gender;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.exception.NotGroupLeaderException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
class MeetingCreateUseCaseTest {

    @Mock
    MeetingRepository meetingRepository;

    @Mock
    GroupRepository groupRepository;

    @InjectMocks
    MeetingCreateUseCase meetingCreateUseCase;

    Group group;
    User leader;

    MeetingCreateRequestDto dto;

    @BeforeEach
    void setUp() {
        dto = getRequestDto();
    }

    @DisplayName("미팅을 저장할 수 있다.")
    @Test
    void 미팅_저장() {
        // given
        Long requestUserId = 1L;
        AuthUser authUser = new AuthUser(requestUserId);
        long groupId = 1L;
        User leader = getLeaderWithId(1L);
        Group group = getGroupWithLeader(leader);

        given(groupRepository.findById(any(Long.class))).willReturn(Optional.ofNullable(group));

        // when
        meetingCreateUseCase.createMeeting(authUser, groupId, dto);

        // then
        verify(meetingRepository, times(1)).save(any(Meeting.class));
    }

    @DisplayName("리더가 아닌 사람이 미팅을 만들면 예외를 반환한다.")
    @Test
    void 리더가_아니면_예외() {
        // given
        Long requestUserId = 1L;
        AuthUser authUser = new AuthUser(requestUserId);
        long groupId = 1L;
        User leader = getLeaderWithId(2L);
        Group group = getGroupWithLeader(leader);

        given(groupRepository.findById(any(Long.class))).willReturn(Optional.ofNullable(group));

        // when then
        assertThatThrownBy(() -> meetingCreateUseCase.createMeeting(authUser, groupId, dto))
                .isInstanceOf(NotGroupLeaderException.class);
    }

    Group getGroupWithLeader(User leader) {
        group = Group.createGroup("TITLE", "DETAIL", "IMAGE_URL", leader);
        ReflectionTestUtils.setField(group, "id", 1L);
        return group;
    }

    User getLeaderWithId(Long id) {
        leader = User.createUser(OAuthProvider.GOOGLE, "oAuthId", "email", Gender.M,
                LocalDate.now(), "profileImageUrl", "aboutMe", "nickName");
        ReflectionTestUtils.setField(leader, "id", id);
        return leader;
    }

    MeetingCreateRequestDto getRequestDto() {
        MeetingCreateRequestDto dto = new MeetingCreateRequestDto();
        dto.setTitle("책방");
        dto.setStartedAt(LocalDateTime.now());
        return dto;
    }
}