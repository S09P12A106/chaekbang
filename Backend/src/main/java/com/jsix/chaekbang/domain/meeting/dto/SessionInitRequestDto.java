package com.jsix.chaekbang.domain.meeting.dto;

import java.util.Map;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SessionInitRequestDto {

    @NotNull
    private String customSessionId;

    public Map<String, String> toMap() {
        return Map.of("customSessionId", customSessionId);
    }

    @Override
    public String toString() {
        return "SessionInitRequestDto{" +
                "customSessionId='" + customSessionId + '\'' +
                '}';
    }
}
