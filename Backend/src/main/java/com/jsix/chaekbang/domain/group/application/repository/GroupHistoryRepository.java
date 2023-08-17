package com.jsix.chaekbang.domain.group.application.repository;

import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.History;
import com.jsix.chaekbang.domain.user.domain.User;
import java.time.LocalDateTime;

public interface GroupHistoryRepository {

    History save(History history);

}
