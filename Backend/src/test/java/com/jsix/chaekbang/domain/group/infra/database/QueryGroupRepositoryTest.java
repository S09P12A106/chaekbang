package com.jsix.chaekbang.domain.group.infra.database;

import static org.assertj.core.api.Assertions.assertThat;

import com.jsix.chaekbang.IntegrationTestSupport;
import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.application.repository.TagRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.GroupTag;
import com.jsix.chaekbang.domain.group.domain.Tag;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.Gender;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.domain.user.domain.User;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.util.ReflectionTestUtils;

class QueryGroupRepositoryTest extends IntegrationTestSupport {

    private List<User> users;
    private List<Tag> tags;

    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private QueryGroupRepository queryGroupRepository;

    @PersistenceContext
    EntityManager entityManager;

    void saveUsers() {
        users = new ArrayList<>();
        for (int idx = 0; idx < 10; idx++) {
            User user = User.createUser(OAuthProvider.GOOGLE, "oAuthId" + idx, "email", Gender.M,
                    LocalDate.now(), "profileImageUrl", "aboutMe", "nickname");
            users.add(user);
            userRepository.save(user);
        }
    }

    void saveGroupsWithUserAndTag(List<Integer> readCounts) {
        for (int idx = 0; idx < readCounts.size(); idx++) {
            Group group = Group.createGroup("title", "detail", "imageUrl", users.get(idx));
            ReflectionTestUtils.setField(group, "readCount", readCounts.get(idx));
            group.addTags(new ArrayList<>(List.of(tags.get(idx))));
            groupRepository.save(group);
        }
    }

    @DisplayName("인기그룹을 조회할 수 있다.")
    @Test
    void 인기_그룹_조회() {
        // given
        List<Integer> readCounts = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
        List<String> tagNames = new ArrayList<>(
                List.of("TAG1", "TAG2", "TAG3", "TAG4", "TAG5", "TAG6", "TAG7", "TAG8", "TAG9",
                        "TAG10"));
        List<Integer> taggedCount = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
        saveUsers();
        saveTags(tagNames, taggedCount);
        saveGroupsWithUserAndTag(readCounts);
        entityManager.clear();
        // when
        List<Group> popularGroups = queryGroupRepository.findMostReadCount();

        //then
        // readCount 상위 8개를 가져온다.
        assertThat(popularGroups.size()).isEqualTo(8);
        assertThat(popularGroups).extracting("readCount")
                                 .containsExactly(10, 9, 8, 7, 6, 5, 4, 3);
    }

    @DisplayName("인기 그룹 관련 태그를 조회할 수 있다.")
    @Test
    void 그룹_태그_조회() {
        // given
        List<Integer> readCounts = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
        List<String> tagNames = new ArrayList<>(
                List.of("TAG1", "TAG2", "TAG3", "TAG4", "TAG5", "TAG6", "TAG7", "TAG8", "TAG9",
                        "TAG10"));
        List<Integer> taggedCount = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
        saveUsers();
        saveTags(tagNames, taggedCount);
        saveGroupsWithUserAndTag(readCounts);
        entityManager.clear();

        // when
        List<Group> popularGroups = queryGroupRepository.findMostReadCount();

        // then
        int idx = 10;
        for (Group group : popularGroups) {
            assertThat(group.getGroupTags()).extracting(GroupTag::getTag)
                                            .extracting("tagName")
                                            .first()
                                            .isEqualTo("TAG" + idx--);
        }
    }

    @DisplayName("추천태그의 모임을 조회할 수 있다.")
    @Test
    void 추천_태그_그룹_조회() {
        // given
        saveUsers();
        String recommendedTagName = "REC_TAG";
        List<String> tagNames = new ArrayList<>(List.of(recommendedTagName, "TAG"));
        List<Integer> taggedCount = new ArrayList<>(List.of(2, 1));
        saveTags(tagNames, taggedCount);

        Group createdGroup = Group.createGroup("title", "detail", "imageUrl", users.get(0));
        Tag savedTag1 = tags.get(0);
        Tag savedTag2 = tags.get(1);
        createdGroup.addTags(List.of(savedTag1, savedTag2));
        groupRepository.save(createdGroup);
        entityManager.clear();

        // when
        Group recommendedGroup = queryGroupRepository.findMostTaggedCountByTagName(
                                                             recommendedTagName)
                                                     .get(0);

        //then
        assertThat(recommendedGroup.getGroupTags()
                                   .size()).isEqualTo(2);
        assertThat(recommendedGroup.getGroupTags()).extracting(GroupTag::getTag)
                                                   .extracting("tagName")
                                                   .contains(recommendedTagName);

    }

    void saveTags(List<String> tagNames, List<Integer> taggedCount) {
        tags = new ArrayList<>();
        for (int idx = 0; idx < tagNames.size(); idx++) {
            Tag tag = Tag.createTag(tagNames.get(idx));
            ReflectionTestUtils.setField(tag, "taggedCount", taggedCount.get(idx));
            tags.add(tag);
        }
        tagRepository.saveAll(tags);
    }

}