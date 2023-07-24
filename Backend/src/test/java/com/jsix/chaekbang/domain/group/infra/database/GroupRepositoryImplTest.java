package com.jsix.chaekbang.domain.group.infra.database;

import static org.assertj.core.api.Assertions.assertThat;

import com.jsix.chaekbang.IntegrationTestSupport;
import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.application.repository.TagRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.Tag;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.Gender;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.domain.user.domain.User;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class GroupRepositoryImplTest extends IntegrationTestSupport {

    @Autowired
    GroupRepository groupRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TagRepository tagRepository;


    @DisplayName("그룹을 저장할 수 있다.")
    @Test
    void 그룹_저장() {
        // given : 유저의 저장이 선행되어야함
        User leader = User.createUser(OAuthProvider.GOOGLE, "oAuthId", "email", Gender.M,
                LocalDate.now(), "profileImageUrl", "aboutMe", "nickName");
        userRepository.save(leader);
        Group group = Group.createGroup("TITLE", "DETAIL", "IMAGE_URL", "QUESTION", leader);

        // when
        Group savedGroup = groupRepository.save(group);

        // then
        assertThat(savedGroup.getId()).isNotNull();
    }

    @DisplayName("그룹을 저장할 때 연관관계가 있는 그룹유저, 그룹태그도 저장된다.")
    @Test
    void 그룹유저_그룹태그_저장() {
        // given : 유저와 태그의 저장이 선행되어야함
        User leader = User.createUser(OAuthProvider.GOOGLE, "oAuthId", "email", Gender.M,
                LocalDate.now(), "profileImageUrl", "aboutMe", "nickName");
        userRepository.save(leader);

        List<Tag> tags = new ArrayList<>(List.of(Tag.createTag("TAG1")));
        tagRepository.saveAll(tags);

        Group group = Group.createGroup("TITLE", "DETAIL", "IMAGE_URL", "QUESTION", leader);
        group.addTags(tags);

        // when
        groupRepository.save(group);

        // then
        assertThat(group.getGroupUsers()
                        .get(0)
                        .getId()).isNotNull();
        assertThat(group.getGroupTags()
                        .get(0)
                        .getId()).isNotNull();
    }

}