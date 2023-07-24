package com.jsix.chaekbang.domain.group.application;

import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.application.repository.TagRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.Tag;
import com.jsix.chaekbang.domain.group.domain.service.TagService;
import com.jsix.chaekbang.domain.group.dto.GroupCreateRequestDto;
import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class GroupCreateUseCase {

    private final GroupRepository groupRepository;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;
    private final TagService tagService;

    public void createGroup(Long leaderId, GroupCreateRequestDto groupCreateRequestDto) {
        User leader = userRepository.findById(leaderId)
                                    .orElseThrow(
                                            () -> new NotFoundResourceException("유저를 찾을 수 없습니다."));
        Group createdGroup = groupCreateRequestDto.toEntityWithLeader(leader);

        List<Tag> existedTags = tagRepository.findByTagNameIn(groupCreateRequestDto.getTagNames());
        List<Tag> allTags = tagService.getAllTagsRequired(existedTags,
                groupCreateRequestDto.getTagNames());
        tagRepository.saveAll(allTags);

        createdGroup.addTags(allTags);
        groupRepository.save(createdGroup);
    }
}
