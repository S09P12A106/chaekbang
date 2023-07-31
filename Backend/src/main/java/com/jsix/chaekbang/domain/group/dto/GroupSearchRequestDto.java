package com.jsix.chaekbang.domain.group.dto;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GroupSearchRequestDto {

    private String keyword;
    private List<Long> tags;

}
