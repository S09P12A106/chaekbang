package com.jsix.chaekbang.domain.user.application;

import com.jsix.chaekbang.domain.user.application.repository.UserRepository;
import com.jsix.chaekbang.domain.user.domain.User;
import com.jsix.chaekbang.domain.user.dto.UserModifyRequestDto;
import com.jsix.chaekbang.global.config.webmvc.AuthUser;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import com.jsix.chaekbang.infra.aws.S3Uploader;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class UserModifyUseCase {

    private final UserRepository userRepository;

    private final S3Uploader s3Uploader;

    public void modifyUser(AuthUser authUser, UserModifyRequestDto userModifyRequestDto) {
        User user = userRepository.findById(authUser.getUserId())
                                  .orElseThrow(
                                          () -> new NotFoundResourceException("해당 유저를 찾을 수 없습니다."));

        String directory = "user/image/";
        String fileName = makeFileName(directory, userModifyRequestDto.getImage());

        user.modifyUser(userModifyRequestDto.getNickname(),
                userModifyRequestDto.makeImageUrl(fileName), userModifyRequestDto.isImageChanged());

        if (userModifyRequestDto.isImageChanged())
            s3Uploader.upload(fileName, userModifyRequestDto.getImage());
    }

    private String makeFileName(String directory, MultipartFile multipartFile) {
        if (multipartFile == null || multipartFile.isEmpty()) {
            return null;
        }

        String extension = StringUtils.getFilenameExtension(multipartFile.getOriginalFilename());
        return directory + UUID.randomUUID() + "." + extension;
    }

}
