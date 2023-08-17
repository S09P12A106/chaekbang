package com.jsix.chaekbang.domain.meeting.domain;

import com.jsix.chaekbang.global.exception.InvalidSessionIdException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class SessionIdValidator {

    private static final String PREFIX = "chaekbang";
    private static final String DELIMITER = "_";

    @Autowired
    public Environment environment;

    public void validate(String sessionId) {
        validateFormat(sessionId);
        validateEnvironmentInfo(sessionId);
    }

    // sessionId가 {}_{}_{숫자} 형식인지 검사
    private void validateFormat(String sessionId) {
        Pattern pattern = Pattern.compile("^.+_.+_\\d+$");
        Matcher matcher = pattern.matcher(sessionId);
        if (!matcher.matches()) {
            throw new InvalidSessionIdException("올바른 sessionId가 아닙니다.");
        }
    }

    public String getSessionId(Long meetingId) {
        String profile = findEnvironment();

        StringBuilder sb = new StringBuilder();
        return sb.append(PREFIX)
                 .append(DELIMITER)
                 .append(profile)
                 .append(DELIMITER)
                 .append(meetingId).toString();
    }

    private String findEnvironment() {
        String[] profiles = environment.getDefaultProfiles();
        if (profiles.length == 0) {
            return "local";
        }
        for (String profile : profiles) {
            if (profile.startsWith("dev")) {
                return "dev";
            }
        }
        return "prod";
    }


    /**
     * openvidu-{env}-{meetingId} 형식의 sessionId를 받아서 meetingId를 Long type으로 반환합니다.
     *
     * @param sessionId
     * @return meetingId
     */
    public Long getIdFromSessionId(String sessionId) {
        // {}_{}_{숫자} 형식의 sessionId에서 숫자 추출
        return Long.parseLong(sessionId.split(DELIMITER)[2]);
    }


    // sessionId가 {}_{환경}_{숫자} 형식의 sessionId에서 환경이 현재 환경과 맞는지 검증
    private void validateEnvironmentInfo(String sessionId) {
        String profile = findEnvironment();
        String environmentInfo = sessionId.split(DELIMITER)[1];
        if (!environmentInfo.equals(profile)) {
            throw new InvalidSessionIdException("유효한 sessionId가 아닙니다.");
        }
    }
}
