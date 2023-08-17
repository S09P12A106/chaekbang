package com.jsix.chaekbang.domain.user.dto;

import com.jsix.chaekbang.domain.group.dto.valid.AllowedContentType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class UserModifyRequestDto {

    private final String IMAGE_DIRECTORY = "https://chaekbang-bucket.s3.ap-northeast-2.amazonaws.com/";

    @NotBlank(message = "닉네임을 입력해주세요.")
    @Size(max = 20, message = "닉네임의 최대 길이는 20글자 입니다.")
    private String nickname;

    @AllowedContentType(allowedTypes = {"image/jpg", "image/jpeg", "image/png"},
            allowedExtensions = {"jpg", "jpeg", "png"})
    private MultipartFile image;

    private boolean imageChanged;

    public String makeImageUrl(String savedImageUrl) {
        return image == null || image.isEmpty() ? null : IMAGE_DIRECTORY + savedImageUrl;
    }

}
