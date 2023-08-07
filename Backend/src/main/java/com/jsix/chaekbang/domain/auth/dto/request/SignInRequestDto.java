package com.jsix.chaekbang.domain.auth.dto.request;


import com.jsix.chaekbang.domain.user.domain.OAuthProvider;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class SignInRequestDto {

    @NotNull
    private OAuthProvider oauthProvider;

    @NotBlank
    private String idToken;

    @NotNull
    private Boolean isLoginKeep;

    public SignInRequestDto(OAuthProvider oauthProvider, String idToken, Boolean isLoginKeep) {
        this.oauthProvider = oauthProvider;
        this.idToken = idToken;
        this.isLoginKeep = isLoginKeep;
    }
}
