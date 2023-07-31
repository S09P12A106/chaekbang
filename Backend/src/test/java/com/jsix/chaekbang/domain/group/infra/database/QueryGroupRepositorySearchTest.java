package com.jsix.chaekbang.domain.group.infra.database;


import static org.assertj.core.api.Assertions.assertThat;

import com.jsix.chaekbang.IntegrationTestSupport;
import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.application.repository.TagRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.GroupTag;
import com.jsix.chaekbang.domain.group.domain.GroupUser;
import com.jsix.chaekbang.domain.group.domain.Tag;
import com.jsix.chaekbang.domain.group.domain.UserStatus;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.Gender;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import com.jsix.chaekbang.domain.user.domain.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

class QueryGroupRepositorySearchTest extends IntegrationTestSupport {

    private List<User> users;
    private List<Tag> tags;
    private List<Group> groups;

    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private JpaGroupUserRepository jpaGroupUserRepository;

    @Autowired
    private QueryGroupRepository queryGroupRepository;

    @PersistenceContext
    EntityManager entityManager;

    void saveUsers() {
        users = new ArrayList<>();
        for (int idx = 0; idx < 10; idx++) {
            users.add(userRepository.save(
                    User.createUser(OAuthProvider.GOOGLE, "oAuthId" + idx, "ssafy@gmail.com",
                            Gender.M,
                            LocalDate.now(), "profileImageUrl", "aboutMe", "nickName")));
        }
    }

    void saveTags() {
        tags = new ArrayList<>();
        for (int idx = 0; idx < 10; idx++) {
            tags.add(tagRepository.save(Tag.createTag("tag" + idx)));
        }
    }

    void saveGroups() {
        groups = new ArrayList<>();
        for (int idx = 0; idx < 10; idx++) {
            Group newGroup = Group.createGroup("title" + idx, "detail", "imageURL", "question",
                    users.get(0));
            addTags(newGroup, idx);
            Group savedGroup = groupRepository.save(newGroup);
            addGroupUser(savedGroup);
            groups.add(savedGroup);
        }
    }

    void addTags(Group group, int idx) {
        if ((idx % 2) == 1) {
            group.addTags(tags.subList(0, 3));
        } else {
            group.addTags(tags.subList(3, 6));
        }
    }

    void addGroupUser(Group group) {
        // 가입 허용이 안 된 유저
        for (int idx = 1; idx < 5; idx++) {
            GroupUser newWaitingUser = GroupUser.builder()
                                                .user((users.get(idx)))
                                                .group(group)
                                                .status(UserStatus.WAITING)
                                                .answer("answer")
                                                .participatedAt(
                                                        null)
                                                .build();
            jpaGroupUserRepository.save(newWaitingUser);
            group.addGroupUser(newWaitingUser);
        }

        // 가입이 허용된 유저
        for (int idx = 5; idx < 10; idx++) {

            GroupUser newActiveGroupUser = GroupUser.builder()
                                                    .user((users.get(idx)))
                                                    .group(group)
                                                    .status(UserStatus.ACTIVE)
                                                    .answer("answer")
                                                    .participatedAt(
                                                            LocalDateTime.now())
                                                    .build();

            jpaGroupUserRepository.save(newActiveGroupUser);
            group.addGroupUser(newActiveGroupUser);
        }
    }


    @DisplayName("키워드와 태그가 주어지지 않으면 전체 그룹 리스트를 반환한다.")
    @Test
    @Transactional
    void 그룹_전체_검색() {
        // given :
        // userId = 1~10 (10명 저장)
        saveUsers();
        // tagId = 1~10 (10개 저장)
        saveTags();
        // groupId = 1~10 (10개 저장)
        saveGroups();

        entityManager.clear();

        // when
        List<Group> groups = queryGroupRepository.findByKeywordAndTags(null, null);

        // then
        assertThat(groups.size()).isEqualTo(10);
    }

    @DisplayName("키워드가 주어지면 키워드가 제목에 포함된 그룹 리스트를 반환한다.")
    @Test
    @Transactional
    void 그룹_키워드_검색() {
        // given
        // userId = 1~10 (10명 저장)
        saveUsers();
        // tagId = 1~10 (10개 저장)
        saveTags();
        // groupId = 1~10 (10개 저장), groupTitle = title0~9
        saveGroups();

        entityManager.clear();

        String keyword = "title3";

        // when
        List<Group> groups = queryGroupRepository.findByKeywordAndTags(keyword, null);

        // then
        assertThat(groups.size()).isEqualTo(1);
        assertThat(groups.stream()
                         .map(Group::getTitle)
                         .allMatch(keyword::contains)).isTrue();

    }

    @DisplayName("검색 태그가 주어지면, 해당 태그 정보를 가진 그룹 리스트를 반환한다.")
    @Test
    @Transactional
    void 그룹_태그_검색() {
        // given
        // userId = 1~10 (10명 저장)
        saveUsers();
        // tagId = 1~10 (10개 저장)
        saveTags();
        // groupId = 1~10 (10개 저장)
        // tag : 4, 5, 6 (groupdId = 1, 3, 5, 7, 9)
        // tag : 1, 2, 3 (groupId = 2, 4, 6, 8, 10)
        saveGroups();

        entityManager.clear();

        //// savedTagIds : 통합테스트 상 증가된 ID값 3개
        List<Long> savedTagIds = getSavedTagIds();

        // when
        List<Group> groups = queryGroupRepository.findByKeywordAndTags(null, savedTagIds);

        // then
        assertThat(groups.size()).isEqualTo(5);
        for (Group group : groups) {
            assertThat(group.getGroupTags()
                            .stream()
                            .map(groupTag -> groupTag.getTag()
                                                     .getId())
                            .anyMatch(savedTagIds::contains)).isTrue();
        }

    }


    @DisplayName("검색 키워드에 해당하는 그룹 정보가 존재하지 않으면 빈 리스트를 반환한다.")
    @Test
    @Transactional
    void 그룹_키워드_정보_없음_검색() {
        //given
        // userId = 1~10 (10명 저장)
        saveUsers();
        // tagId = 1~10 (10개 저장)
        saveTags();
        // groupId = 1~10 (10개 저장)
        saveGroups();

        entityManager.clear();

        String keyword = "해당 정보가 없습니다.";

        // when
        List<Group> groups = queryGroupRepository.findByKeywordAndTags(keyword, null);

        // then
        assertThat(groups.size()).isEqualTo(0);
    }

    @DisplayName("검색 태그에 해당하는 그룹 정보가 존재하지 않으면 빈 리스트를 반환한다.")
    @Test
    @Transactional
    void 그룹_태그_정보_없음_검색() {
        //given
        // userId = 1~10 (10명 저장)
        saveUsers();
        // tagId = 1~10 (10개 저장)
        saveTags();
        // groupId = 1~10 (10개 저장)
        // tag : 4, 5, 6 (groupdId = 1, 3, 5, 7, 9)
        // tag : 1, 2, 3 (groupId = 2, 4, 6, 8, 10)
        saveGroups();

        entityManager.clear();

        List<Long> tagIds = new ArrayList<>(List.of(7L, 8L));

        // when
        List<Group> groups = queryGroupRepository.findByKeywordAndTags(null, tagIds);

        // then
        assertThat(groups.size()).isEqualTo(0);
    }

    @DisplayName("검색 키워드와 검색 태그가 동시에 주어지면, 검색 키워드를 제목에 포함하고, 검색 태그 정보를 가진 그룹 정보 리스트가 반환된다.")
    @Test
    @Transactional
    void 그룹_키워드_태그_검색() {
        //given
        // userId = 1~10 (10명 저장)
        saveUsers();
        // tagId = 1~10 (10개 저장)
        saveTags();
        // groupId = 1~10 (10개 저장)
        // tag : 4, 5, 6 (groupdId = 1, 3, 5, 7, 9)
        // tag : 1, 2, 3 (groupId = 2, 4, 6, 8, 10)
        saveGroups();

        entityManager.clear();

        String keyword = "title1";

        //// savedTagIds : 통합테스트 상 증가된 값
        List<Long> savedTagIds = getSavedTagIds();

        // when
        List<Group> groups = queryGroupRepository.findByKeywordAndTags(keyword, savedTagIds);

        // then
        assertThat(groups.size()).isEqualTo(1);

        assertThat(groups.stream()
                         .map(Group::getTitle)
                         .allMatch(keyword::contains)).isTrue();

        for (Group group : groups) {
            assertThat(group.getGroupTags()
                            .stream()
                            .map(groupTag -> groupTag.getTag()
                                                     .getId())
                            .anyMatch(savedTagIds::contains)).isTrue();
        }
    }

    @DisplayName("검색 키워드에 해당하는 그룹 정보가 존재하지 않으면 빈 리스트를 반환한다.")
    @Test
    @Transactional
    void 가입된_회원_수_조회() {
        //given
        // userId = 1~10 (10명 저장)
        saveUsers();
        // tagId = 1~10 (10개 저장)
        saveTags();
        // groupId = 1~10 (10개 저장)
        // tag : 4, 5, 6 (groupdId = 1, 3, 5, 7, 9)
        // tag : 1, 2, 3 (groupId = 2, 4, 6, 8, 10)
        saveGroups();

        entityManager.clear();

        String keyword = "title1";

        // when
        List<Group> groups = queryGroupRepository.findByKeywordAndTags(keyword, null);

        // then
        assertThat(groups.size()).isEqualTo(1);
        for (Group group : groups) {
            assertThat(group.getJoinedUserCount()).isEqualTo(6);
        }
    }

    private List<Long> getSavedTagIds() {
        List<GroupTag> groupTags = groups.get(1)
                                         .getGroupTags();

        List<Long> savedTagId = new ArrayList<>();

        for (GroupTag groupTag : groupTags) {
            savedTagId.add(groupTag.getTag()
                                   .getId());
        }

        return savedTagId;
    }

}
