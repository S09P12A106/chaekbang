package com.jsix.chaekbang.domain.group.controller;

import com.jsix.chaekbang.domain.group.application.GroupCreateUseCase;
import com.jsix.chaekbang.domain.group.application.GroupSearchUseCase;
import com.jsix.chaekbang.domain.group.dto.GroupCreateRequestDto;
import com.jsix.chaekbang.domain.group.dto.GroupSearchRequestDto;
import com.jsix.chaekbang.domain.group.dto.GroupWithUserAndTagResponseDto;
import com.jsix.chaekbang.global.dto.HttpResponse;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupCreateUseCase groupCreateUseCase;
    private final GroupSearchUseCase groupSearchUseCase;

    @PostMapping
    public ResponseEntity<?> createGroup(
            @RequestBody @Valid GroupCreateRequestDto groupCreateRequestDto) {
        Long leaderId = 1L;
        groupCreateUseCase.createGroup(leaderId, groupCreateRequestDto);
        return HttpResponse.ok(HttpStatus.CREATED, "모임이 생성되었습니다.");
    }

    @GetMapping("/popular")
    public ResponseEntity<?> searchPopularGroups() {
        return HttpResponse.okWithData(HttpStatus.OK, "인기 모임 조회 성공했습니다.",
                groupSearchUseCase.findPopularGroups());
    }

    @GetMapping("/recommended")
    public ResponseEntity<?> searchRecommendedGroups() {
        return HttpResponse.okWithData(HttpStatus.OK, "추천 모임 조회 성공했습니다.",
                groupSearchUseCase.findRecommendedGroups());
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchGroupsByKeywordAndTags(
            GroupSearchRequestDto groupSearchRequestDto) {
        List<GroupWithUserAndTagResponseDto> responseGroups = groupSearchUseCase.searchGroupByKeywordAndTags(
                groupSearchRequestDto);
        return HttpResponse.okWithData(HttpStatus.OK, "그룹 내역 조회 성공했습니다.", responseGroups);
    }

    @GetMapping("/{group_id}")
    public ResponseEntity<?> searchGroupDetail(
            @PathVariable("group_id")
            @Min(1) long groupId) {
        return HttpResponse.okWithData(HttpStatus.OK, "그룹 조회 성공했습니다.",
                groupSearchUseCase.searchGroupDetail(groupId));
    }

    @GetMapping("/{group_id}/members")
    public ResponseEntity<?> searchGroupMembers(
            @PathVariable("group_id")
            @Min(1) long groupId) {
        return HttpResponse.okWithData(HttpStatus.OK, "그룹 회원 조회 성공했습니다.",
                groupSearchUseCase.searchGroupUsers(groupId));
    }
}
