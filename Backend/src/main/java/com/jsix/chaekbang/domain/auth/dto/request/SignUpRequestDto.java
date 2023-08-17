package com.jsix.chaekbang.domain.auth.dto.request;

import com.jsix.chaekbang.domain.user.domain.Gender;
import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {


    @NotBlank
    @Size(min = 2, max = 20)
    private String nickname;

    @NotNull
    @Past
    private LocalDate birth;

    @NotNull
    private Gender gender;

    @NotBlank
    @Size(min = 1, max = 100)
    private String aboutMe;

    @NotNull
    private OAuthProvider oAuthProvider;

    @NotBlank
    private String idToken;

    public SignUpRequestDto(String nickname, LocalDate birth, Gender gender, String aboutMe,
            OAuthProvider oAuthProvider, String idToken) {
        this.nickname = nickname;
        this.birth = birth;
        this.gender = gender;
        this.aboutMe = aboutMe;
        this.oAuthProvider = oAuthProvider;
        this.idToken = idToken;
    }
}
