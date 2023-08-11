package com.jsix.chaekbang.domain.group.application;

import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.application.repository.TagRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.GroupTag;
import com.jsix.chaekbang.domain.group.domain.Tag;
import com.jsix.chaekbang.domain.group.domain.service.TagService;
import com.jsix.chaekbang.domain.group.dto.GroupModifyRequestDto;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import com.jsix.chaekbang.global.exception.PermissionDeniedException;
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
public class GroupModifyUseCase {

    private final GroupRepository groupRepository;
    private final TagRepository tagRepository;
    private final TagService tagService;

    private final S3Uploader s3Uploader;

    public void modifyGroup(AuthUser leader, long groupId,
            GroupModifyRequestDto groupModifyRequestDto) {
        Group group = validateGroup(groupId);
        validateLeader(leader, group);

        String directory = "group/image/";
        String fileName = makeFileName(directory, groupModifyRequestDto.getImage());

        List<Tag> existedTags = tagRepository.findByTagNameIn(groupModifyRequestDto.getTagNames());
        List<Tag> prevTags = group.getGroupTags().stream().map(GroupTag::getTag).toList();
        List<Tag> keepTags = prevTags.stream()
                                     .filter(existedTags::contains).toList();
        group.removeTagWithoutKeepTags(keepTags);

        List<Tag> newTags = existedTags.stream().filter(tag -> !prevTags.contains(tag)).toList();
        List<Tag> allTags = tagService.getAllTagsRequired(newTags, keepTags,
                groupModifyRequestDto.getTagNames());
        tagRepository.saveAll(allTags);

        group.modifyGroup(groupModifyRequestDto.getTitle(), groupModifyRequestDto.getDetail(),
                groupModifyRequestDto.makeImageUrl(fileName), groupModifyRequestDto.isImageChanged());

        group.addTags(allTags);
        if (groupModifyRequestDto.isImageChanged())
            s3Uploader.upload(fileName, groupModifyRequestDto.getImage());
    }

    private void validateLeader(AuthUser leader, Group group) {
        if (!group.getLeaderId().equals(leader.getUserId())) {
            throw new PermissionDeniedException("해당 그룹의 리더가 아닙니다.");
        }
    }

    private Group validateGroup(long groupId) {
        return groupRepository.findById(groupId)
                              .orElseThrow(
                                      () -> new NotFoundResourceException("그룹을 찾을 수 없습니다."));
    }

    private String makeFileName(String directory, MultipartFile multipartFile) {
        if (multipartFile == null || multipartFile.isEmpty()) {
            return null;
        }

        String extension = StringUtils.getFilenameExtension(multipartFile.getOriginalFilename());
        return directory + UUID.randomUUID() + "." + extension;
    }

}
