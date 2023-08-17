package com.jsix.chaekbang.domain.job.domain;

import com.jsix.chaekbang.domain.meeting.application.repository.MeetingRepository;
import com.jsix.chaekbang.domain.meeting.domain.Meeting;
import com.jsix.chaekbang.domain.meeting.dto.socket.MeetingNotificationDto;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.messaging.converter.SimpleMessageConverter;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;


/*
 *  Meeting이 ClosedAt 이 Null 이면 해당 미팅을 종료시킨다.
 *
 */

@Slf4j
@Component
@RequiredArgsConstructor
public class MeetingCloseJob extends QuartzJobBean {


    private final MeetingRepository meetingRepository;
    private final SimpMessageSendingOperations messagingTemplate;
    private final PlatformTransactionManager transactionManager;

    /*
     *  자동 종료 후 소켓으로 전송한다.
     */

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        Long meetingId = Long.valueOf(
            context.getJobDetail().getJobDataMap().get("meetingId").toString());

        log.info("미팅 자동 종료 Job 실행 ID = {}", meetingId);

        TransactionStatus transaction = transactionManager.getTransaction(
            new DefaultTransactionDefinition());

        try {
            Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new NotFoundResourceException("해당 미팅 방을 찾을 수 없습니다."));

            // 이미 미팅이 종료됐으면 작업 종료
            if (meeting.isClose()) {
                return;
            }

            meeting.close(LocalDateTime.now());
            meetingRepository.save(meeting);
            messagingTemplate.convertAndSend("/topic/meeting/" + meetingId + "/noti",
                MeetingNotificationDto.closeNoti());
        } catch (Exception e) {
            log.error("미팅 방 자동 종료 Job 실패 {}", e.getMessage());
            transactionManager.rollback(transaction);
        } finally {
            transactionManager.commit(transaction);
        }
    }
}
