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
import com.jsix.chaekbang.infra.aws.S3Uploader;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class GroupCreateUseCase {

    private final GroupRepository groupRepository;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;
    private final TagService tagService;
    private final S3Uploader s3Uploader;

    public void createGroup(Long leaderId, GroupCreateRequestDto groupCreateRequestDto) {
        User leader = userRepository.findById(leaderId)
                                    .orElseThrow(
                                            () -> new NotFoundResourceException("유저를 찾을 수 없습니다."));
        String directory = "group/image/";
        String fileName = makeFileName(directory, groupCreateRequestDto.getImage());
        Group createdGroup = groupCreateRequestDto.toEntityWithLeader(leader, fileName);

        List<Tag> existedTags = tagRepository.findByTagNameIn(groupCreateRequestDto.getTagNames());
        List<Tag> allTags = tagService.getAllTagsRequired(existedTags,
                groupCreateRequestDto.getTagNames());
        tagRepository.saveAll(allTags);

        createdGroup.addTags(allTags);
        groupRepository.save(createdGroup);

        s3Uploader.upload(fileName, groupCreateRequestDto.getImage());
    }

    private String makeFileName(String directory, MultipartFile multipartFile){
        if (multipartFile == null){
            return null;
        }
        String extension = StringUtils.getFilenameExtension(multipartFile.getOriginalFilename());
        return directory + UUID.randomUUID() + "." + extension;
    }
}
