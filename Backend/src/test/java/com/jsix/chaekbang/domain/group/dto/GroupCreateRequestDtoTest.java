package com.jsix.chaekbang.domain.group.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.jsix.chaekbang.IntegrationTestSupport;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;


@ExtendWith(MockitoExtension.class)
class GroupCreateRequestDtoTest extends IntegrationTestSupport {

    @Autowired
    Validator validatorInjected;

    GroupCreateRequestDto dto;

    @BeforeEach
    void setGroupCreateRequestDto() {
        // 정상적인 값 넣음
        List<String> tagNames = new ArrayList<>();
        tagNames.add("TAG1");

        dto = new GroupCreateRequestDto();
        dto.setTitle("TITLE");
        dto.setDetail("DETAIL");
        dto.setTagNames(tagNames);
        dto.setImage(null);
    }

    @DisplayName("공백이 포함된 태그 이름이 들어가면 에러메시지를 출력한다.")
    @Test
    void 태그_이름_공백_테스트() {
        // given
        List<String> tagNames = new ArrayList<>();
        tagNames.add("공 백");
        dto.setTagNames(tagNames);

        // when
        Set<ConstraintViolation<GroupCreateRequestDto>> validate = validatorInjected.validate(dto);
        String message = validate.iterator()
                                 .next()
                                 .getMessage();

        // then
        assertThat(message).isEqualTo("태그에는 공백이 포함될 수 없습니다.");
    }

    @DisplayName("탭이 포함된 태그 이름이 들어가면 에러메시지를 출력한다.")
    @Test
    void 태그_이름_탭_테스트() {
        // given
        List<String> tagNames = new ArrayList<>();
        tagNames.add("탭\t탭");
        dto.setTagNames(tagNames);

        // when
        Set<ConstraintViolation<GroupCreateRequestDto>> validate = validatorInjected.validate(dto);
        String message = validate.iterator()
                                 .next()
                                 .getMessage();

        // then
        assertThat(message).isEqualTo("태그에는 공백이 포함될 수 없습니다.");
    }

    @DisplayName("중복된 태그 이름이 들어가면 에러 메시지를 출력한다.")
    @Test
    void 중복_태그_테스트() {
        // given
        List<String> tagNames = new ArrayList<>();
        tagNames.add("TAG");
        tagNames.add("TAG");

        dto.setTagNames(tagNames);

        // when
        Set<ConstraintViolation<GroupCreateRequestDto>> validate = validatorInjected.validate(dto);
        String message = validate.iterator()
                                 .next()
                                 .getMessage();

        // then
        assertThat(message).isEqualTo("중복된 태그는 설정할 수 없습니다.");
    }

    @DisplayName("허용되지 않은 콘텐트 타입이 들어가면 에러메시지를 출력한다.")
    @Test
    void 파일_콘텐트타입_테스트() {
        // given
        String textContentType = "text/plain";
        MockMultipartFile textContentTypeFile = new MockMultipartFile("file", "image.png",
                textContentType, "file".getBytes());
        dto.setImage(textContentTypeFile);

        // when
        Set<ConstraintViolation<GroupCreateRequestDto>> validate = validatorInjected.validate(dto);
        String message = validate.iterator()
                                 .next()
                                 .getMessage();

        // then
        assertThat(message).isEqualTo("유효한 파일이 아닙니다.");
    }

    @DisplayName("허용되지 않은 확장자가 들어가면 에러메시지를 출력한다.")
    @Test
    void 파일_확장자_테스트() {
        // given
        String originalFileName = "TEXT.txt";
        MockMultipartFile textExtensionFile = new MockMultipartFile("file", originalFileName,
                "image/png", "IMAGE".getBytes());

        dto.setImage(textExtensionFile);

        // when
        Set<ConstraintViolation<GroupCreateRequestDto>> validate = validatorInjected.validate(dto);
        String message = validate.iterator()
                                 .next()
                                 .getMessage();

        // then
        assertThat(message).isEqualTo("유효한 파일이 아닙니다.");
    }
}