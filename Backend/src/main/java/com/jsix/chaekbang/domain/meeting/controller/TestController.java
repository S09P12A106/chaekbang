package com.jsix.chaekbang.domain.meeting.controller;


import com.jsix.chaekbang.domain.group.application.repository.GroupRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.dto.GroupDetailResponseDto;
import com.jsix.chaekbang.domain.meeting.application.VoteUseCase;
import com.jsix.chaekbang.domain.meeting.dto.socket.CreateVoteRequestDto;
import com.jsix.chaekbang.domain.meeting.dto.socket.SendVoteRequestDto;
import com.jsix.chaekbang.domain.meeting.dto.socket.VoteResponseDto;
import com.jsix.chaekbang.global.config.stomp.SocketAuthUser;
import com.jsix.chaekbang.global.dto.HttpResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/*
*  using test, 오늘 이후 삭제 예정 
*/
@RestController
@RequiredArgsConstructor
public class TestController {

    private final VoteUseCase voteUseCase;
    private final GroupRepository groupRepository;

    @GetMapping("/t1")
    public ResponseEntity<?> getT() {
        Group group = groupRepository.findGroupByMeetingId(1L);
        Long id = group.getId();
        Long leaderId = group.getLeaderId();
        return HttpResponse.okWithData(HttpStatus.OK, "mm", id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody CreateVoteRequestDto voteRequestDto) {
        voteUseCase.createVote(voteRequestDto, 1L, 1L);
        return HttpResponse.ok(HttpStatus.OK, "...");
    }

    @GetMapping("/all")
    public ResponseEntity<?> all() {
        List<VoteResponseDto> all = voteUseCase.findAllByMeetingId(1L);
        return HttpResponse.okWithData(HttpStatus.OK, "성공", all);
    }

    @PostMapping("/vote")
    public ResponseEntity<?> vote(@RequestBody SendVoteRequestDto requestDto) {
//        voteUseCase.vote(requestDto, new SocketAuthUser(2L, "닉네임", "이미지", "1111"));
        return HttpResponse.ok(HttpStatus.OK, "...");
    }

}
