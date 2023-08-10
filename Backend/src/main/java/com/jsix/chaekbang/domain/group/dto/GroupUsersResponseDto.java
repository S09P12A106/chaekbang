package com.jsix.chaekbang.domain.group.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class GroupUsersResponseDto {

    private long leaderId;
    private List<GroupUserResponseDto> users;

    public GroupUsersResponseDto(long leaderId, List<GroupUserResponseDto> users) {
        this.leaderId = leaderId;
        this.users = users;
    }
}
