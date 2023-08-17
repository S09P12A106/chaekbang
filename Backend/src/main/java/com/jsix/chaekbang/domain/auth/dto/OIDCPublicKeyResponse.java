package com.jsix.chaekbang.domain.auth.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OIDCPublicKeyResponse {

    List<OIDCPublicKeyDto> keys;
}
