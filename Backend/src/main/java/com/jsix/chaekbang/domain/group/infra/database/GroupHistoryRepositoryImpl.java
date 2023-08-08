package com.jsix.chaekbang.domain.group.infra.database;

import com.jsix.chaekbang.domain.group.application.repository.GroupHistoryRepository;
import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.History;
import com.jsix.chaekbang.domain.user.domain.User;
import java.time.LocalDateTime;
import javax.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GroupHistoryRepositoryImpl implements GroupHistoryRepository {

    private final JpaGroupHistoryRepository jpaGroupHistoryRepository;

    @Override
    public History save(History history) {
        return jpaGroupHistoryRepository.save(history);
    }

}
