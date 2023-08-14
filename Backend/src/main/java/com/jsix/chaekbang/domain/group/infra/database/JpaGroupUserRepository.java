package com.jsix.chaekbang.domain.group.infra.database;

import com.jsix.chaekbang.domain.group.domain.Group;
import com.jsix.chaekbang.domain.group.domain.GroupUser;
import com.jsix.chaekbang.domain.group.domain.UserStatus;
import com.jsix.chaekbang.domain.user.domain.User;
import java.util.Optional;
import org.hibernate.annotations.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface JpaGroupUserRepository extends JpaRepository<GroupUser, Long> {
    boolean existsByGroup_IdAndStatusAndUser_Id(long groupId, UserStatus status, long userId);
}
