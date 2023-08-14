package com.jsix.chaekbang.domain.meeting.controller;


import com.jsix.chaekbang.domain.meeting.dto.socket.SendEmojiRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class SocketController {

    private final SimpMessageSendingOperations messagingTemplate;
    // 해당 미팅에 이모지 보내기
    @MessageMapping("/meeting/{meetingId}/emoji")
    public void sendEmoji(@Payload SendEmojiRequestDto emojiRequestDto, @DestinationVariable("meetingId") Long id){
        // emoji는 그대로 보낸다.
        messagingTemplate.convertAndSend("/topic/meeting/"+id+"/emoji",emojiRequestDto);
    }



}
