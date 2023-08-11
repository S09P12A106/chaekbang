package com.jsix.chaekbang.domain.group.dto;

import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.dto.valid.AllowedContentType;
import com.jsix.chaekbang.domain.group.dto.valid.NotContainsBlank;
import com.jsix.chaekbang.domain.group.dto.valid.NotDuplicatedTags;
import com.jsix.chaekbang.domain.user.domain.User;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class GroupCreateRequestDto {

    private final String IMAGE_DIRECTORY = "https://chaekbang-bucket.s3.ap-northeast-2.amazonaws.com/";

    @NotBlank(message = "모임 이름을 입력해주세요.")
    @Size(max = 30, message = "모임 이름의 최대 길이는 30글자 입니다.")
    private String title;

    @NotBlank(message = "모임 소개를 입력해주세요.")
    private String detail;

    @Size(max = 5, message = "태그는 최대 5개까지 설정 가능합니다.")
    @NotDuplicatedTags
    private List<
            @NotBlank(message = "잘못 된 태그 이름입니다.")
            @Size(max = 10, message = "태그 이름의 최대 길이는 10글자 입니다.")
            @NotContainsBlank
                    String> tagNames;

    @AllowedContentType(allowedTypes = {"image/jpg", "image/jpeg", "image/png"},
            allowedExtensions = {"jpg", "jpeg", "png"})
    private MultipartFile image;

    public Group toEntityWithLeader(User user, String savedImageUrl) {
        String imageUrl = image == null || image.isEmpty() ? null : IMAGE_DIRECTORY + savedImageUrl;
        return Group.createGroup(title, detail, imageUrl, user);
    }

}
