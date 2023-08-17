package com.jsix.chaekbang.domain.job.application;

import com.jsix.chaekbang.domain.job.domain.MeetingCloseJob;
import com.jsix.chaekbang.domain.job.domain.MeetingJobType;
import com.jsix.chaekbang.domain.job.domain.MeetingWarningJob;
import com.jsix.chaekbang.global.exception.BusinessException;
import java.time.LocalDateTime;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Slf4j
@Service
@RequiredArgsConstructor
public class MeetingJobRegister {

    private final Scheduler scheduler;
    private final String CLOSE_JOB_GROUP = "CLOSE_JOB_GROUP";
    private final String WARING_JOB_GROUP = "WARING_JOB_GROUP";

    private final Environment environment;

    /*
     *  종료 잡 등록시 경고 잡까지 같이 등록된다.
     */
    public void registerCloseJob(Long meetingId, LocalDateTime startTime) {
        String closeJobName = MeetingJobType.CLOSE.name() + "/" + meetingId;
        String waringJobName = MeetingJobType.WARNING.name() + "/" + meetingId;

        boolean productionEnviroment = isProductionEnvironment();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime waringTime = productionEnviroment ? now.plusMinutes(50) : now.plusMinutes(3);
        LocalDateTime closeTime = productionEnviroment ? now.plusMinutes(60) : now.plusMinutes(5);

        try {
            JobDetail closeJobDetail = closeJobDetail(closeJobName, CLOSE_JOB_GROUP, meetingId);
            JobDetail waringJobDetail = waringJobDetail(waringJobName, WARING_JOB_GROUP, meetingId);
            scheduler.scheduleJob(waringJobDetail,
                makeJobTrigger(waringJobName, WARING_JOB_GROUP, waringTime));
            scheduler.scheduleJob(closeJobDetail,
                makeJobTrigger(closeJobName, CLOSE_JOB_GROUP, closeTime));
        } catch (SchedulerException e) {
            log.error("close Job 등록 실패 {}", e.getMessage());
            throw new BusinessException(500, "잡 등록 실패 !");
        }
    }

    // 운영용 아니면 10분으로 처리 함.
    private boolean isProductionEnvironment() {
        String[] defaultProfiles = environment.getDefaultProfiles();
        for (String str : defaultProfiles) {
            if (str.startsWith("prod")) {
                return true;
            }
        }
        return false;
    }

    private JobDetail waringJobDetail(String jobName, String jobGroup, Long meetingId) {
        return JobBuilder.newJob(MeetingWarningJob.class)
            .withIdentity(jobName, jobGroup)
            .usingJobData("meetingId", meetingId)
            .build();
    }

    private JobDetail closeJobDetail(String jobName, String jobGroup, Long meetingId) {
        return JobBuilder.newJob(MeetingCloseJob.class)
            .withIdentity(jobName, jobGroup)
            .usingJobData("meetingId", meetingId)
            .build();
    }


    private Trigger makeJobTrigger(String triggerName, String jobGroup, LocalDateTime startAt) {
        Date triggerTime = Timestamp.valueOf(startAt);
        return TriggerBuilder.newTrigger()
            .withIdentity(triggerName, jobGroup)
            .startAt(triggerTime)
            .build();
    }

}
