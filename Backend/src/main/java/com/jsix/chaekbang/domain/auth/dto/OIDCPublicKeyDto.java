package com.jsix.chaekbang.domain.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OIDCPublicKeyDto {

    private String kid;
    private String alg;
    private String use;
    private String n;
    private String e;

}
