package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.domain.GroupEntity
import hu.bme.aut.collectoro.domain.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GroupRepository : JpaRepository<GroupEntity, Long> {
    fun findByUsers(user: UserEntity): List<GroupEntity>
}