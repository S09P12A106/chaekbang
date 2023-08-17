package com.jsix.chaekbang.domain.group.domain;


import com.jsix.chaekbang.domain.user.domain.Gender;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.domain.user.domain.User;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;


class GroupTest {

    @DisplayName("그룹을 생성할 때 리더를 넣어주면 그룹유저와 연관관계가 설정된다.")
    @Test
    void 그룹유저_연관관계_테스트(){
        // given
        User leader = User.createUser(OAuthProvider.GOOGLE, "oAuthId", "email", Gender.M,
                LocalDate.now(), "profileImageUrl", "aboutMe", "nickName");
        ReflectionTestUtils.setField(leader, "id", 1L);

        // when
        Group createdGroup = Group.createGroup("TITLE", "DETAIL", "IMAGE_URL", leader);

        // then
        GroupUser createdGroupLeader = createdGroup.getGroupUsers().get(0);
        assertThat(createdGroupLeader.getGroup()).isEqualTo(createdGroup);
    }

    @DisplayName("그룹을 생성할 때 그룹유저가 생성되고 participatedAt와 status가 설정된다.")
    @Test
    void 그룹_생성_그룹유저_테스트(){
        // given
        User leader = User.createUser(OAuthProvider.GOOGLE, "oAuthId", "email", Gender.M,
                LocalDate.now(), "profileImageUrl", "aboutMe", "nickName");
        ReflectionTestUtils.setField(leader, "id", 1L);

        // when
        Group createdGroup = Group.createGroup("TITLE", "DETAIL", "IMAGE_URL", leader);
        GroupUser createdGroupLeader = createdGroup.getGroupUsers().get(0);
        // then
        assertThat(createdGroupLeader.getParticipatedAt()).isNotNull();
        assertThat(createdGroupLeader.getStatus()).isEqualTo(UserStatus.ACTIVE);
    }

    @DisplayName("그룹에서 태그 리스트를 넣어주면 그룹태그와 연관관계가 설정된다.")
    @Test
    void 그룹태그_연관관계_테스트(){
        // given
        User leader = User.createUser(OAuthProvider.GOOGLE, "oAuthId", "email", Gender.M,
                LocalDate.now(), "profileImageUrl", "aboutMe", "nickName");
        ReflectionTestUtils.setField(leader, "id", 1L);

        Tag tag = Tag.createTag("TAG");
        ReflectionTestUtils.setField(tag, "id", 1L);

        List<Tag> tags = new ArrayList<>(List.of(tag));
        Group createdGroup = Group.createGroup("TITLE", "DETAIL", "IMAGE_URL", leader);

        // when
        createdGroup.addTags(tags);

        // then
        GroupTag groupTag = createdGroup.getGroupTags().get(0);
        assertThat(groupTag.getGroup()).isEqualTo(createdGroup);
    }
}