package com.jsix.chaekbang.domain.group.infra.database;

import com.jsix.chaekbang.domain.group.domain.History;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaGroupHistoryRepository extends JpaRepository<History, Long> {

}
