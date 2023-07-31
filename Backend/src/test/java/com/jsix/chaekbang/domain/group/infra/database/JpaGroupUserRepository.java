package com.jsix.chaekbang.domain.group.infra.database;

import com.jsix.chaekbang.domain.group.domain.GroupUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaGroupUserRepository extends JpaRepository<GroupUser, Long> {

}
