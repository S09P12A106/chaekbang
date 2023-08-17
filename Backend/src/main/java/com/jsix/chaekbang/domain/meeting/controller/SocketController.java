package com.jsix.chaekbang.domain.meeting.controller;


import com.jsix.chaekbang.domain.meeting.application.VoteUseCase;
import com.jsix.chaekbang.domain.meeting.dto.socket.CreateVoteRequestDto;
import com.jsix.chaekbang.domain.meeting.dto.socket.SendEmojiRequestDto;
import com.jsix.chaekbang.domain.meeting.dto.socket.SendVoteRequestDto;
import com.jsix.chaekbang.domain.meeting.dto.socket.VoteResponseDto;
import com.jsix.chaekbang.global.config.stomp.SocketAuthUser;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class SocketController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final VoteUseCase voteUseCase;

    // 해당 미팅에 이모지 보내기
    @MessageMapping("/meeting/{meetingId}/emoji")
    public void sendEmoji(@Payload SendEmojiRequestDto emojiRequestDto,
        @DestinationVariable("meetingId") Long id) {
        // emoji는 그대로 보낸다.
        messagingTemplate.convertAndSend("/topic/meeting/" + id + "/emoji", emojiRequestDto);
    }

    @MessageMapping("/meeting/{meetingId}/vote/hello")
    public void helloMeeting(@DestinationVariable("meetingId") Long id) {
        List<VoteResponseDto> result = voteUseCase.findAllByMeetingId(id);
        log.info("HELLO {}", result);
        messagingTemplate.convertAndSend("/topic/meeting/" + id + "/vote", result);
    }


    @MessageMapping("/meeting/{meetingId}/vote/createVote")
    public void createVote(@Payload CreateVoteRequestDto requestDto,
        @DestinationVariable("meetingId") Long id, @Header("simpUser") SocketAuthUser user) {

        log.info("CREATE VOTE {}", requestDto);
        voteUseCase.createVote(requestDto, user.getUserId(), id);
        List<VoteResponseDto> result = voteUseCase.findAllByMeetingId(id);

        log.info("{}", result);
        messagingTemplate.convertAndSend("/topic/meeting/" + id + "/vote", result);
    }

    @MessageMapping("/meeting/{meetingId}/vote/sendVote")
    public void createVote(@Payload SendVoteRequestDto requestDto,
        @DestinationVariable("meetingId") Long id, @Header("simpUser") SocketAuthUser user) {
        log.info("SENDVOTE {}", requestDto);

        voteUseCase.vote(requestDto, user);
        List<VoteResponseDto> result = voteUseCase.findAllByMeetingId(id);

        log.info("{}", result);
        messagingTemplate.convertAndSend("/topic/meeting/" + id + "/vote", result);
    }

    @MessageMapping("/meeting/{meetingId}/vote/closeVote/{voteId}")
    public void closeVote(@DestinationVariable("voteId") String voteId,
        @DestinationVariable("meetingId") Long id,
        @Header("simpUser") SocketAuthUser user) {

        log.info("CLOSE VOTE voteID = > {}", id);
        voteUseCase.closeVote(voteId, user);
        List<VoteResponseDto> result = voteUseCase.findAllByMeetingId(id);

        log.info("{}", result);
        messagingTemplate.convertAndSend("/topic/meeting/" + id + "/vote", result);
    }
}
