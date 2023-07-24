package com.jsix.chaekbang.domain.group.dto;

import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.dto.valid.NotContainsBlank;
import com.jsix.chaekbang.domain.group.dto.valid.NotDuplicatedTags;
import com.jsix.chaekbang.domain.user.domain.User;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PACKAGE)
public class GroupCreateRequestDto {

    @NotBlank(message = "모임 이름을 입력해주세요.")
    @Size(max = 30, message = "모임 이름의 최대 길이는 30글자 입니다.")
    private String title;

    @NotBlank(message = "모임 소개를 입력해주세요.")
    private String detail;

    @NotBlank(message = "가입 질문을 입력해주세요.")
    @Size(max = 100, message = "가입 질문의 최대 길이는 100글자 입니다.")
    private String question;

    @Size(max = 5, message = "태그는 최대 5개까지 설정 가능합니다.")
    @NotDuplicatedTags
    private List<
            @NotBlank(message = "잘못 된 태그 이름입니다.")
            @Size(max = 10, message = "태그 이름의 최대 길이는 10글자 입니다.")
            @NotContainsBlank
                    String> tagNames;

    public Group toEntityWithLeader(User user) {
        return Group.createGroup(title, detail, "imageUrl", question, user);
    }

}
