package com.jsix.chaekbang.domain.user.dto;


import com.jsix.chaekbang.domain.user.domain.Gender;
import com.jsix.chaekbang.domain.user.domain.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoResponseDto {

    private Long userId;
    private String nickname;
    private String profileImageUrl;
    private String email;
    private Gender gender;
    private String birthDate;


    @Builder
    public UserInfoResponseDto(Long userId, String nickname, String profileImageUrl, String email,
            Gender gender, LocalDate birthDate) {
        this.userId = userId;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.email = email;
        this.gender = gender;
        this.birthDate = birthDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }


    public static UserInfoResponseDto from(User user) {
        return UserInfoResponseDto.builder()
                                  .userId(user.getId())
                                  .nickname(user.getNickname())
                                  .profileImageUrl(user.getProfileImageUrl())
                                  .email(user.getEmail())
                                  .gender(user.getGender())
                                  .birthDate(user.getBirthDate())
                                  .build();
    }
}
