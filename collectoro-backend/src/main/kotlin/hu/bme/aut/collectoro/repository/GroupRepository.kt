package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.domain.GroupEntity
import hu.bme.aut.collectoro.domain.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface GroupRepository : JpaRepository<GroupEntity, Long> {
    fun findByUsers(user: UserEntity): List<GroupEntity>

    fun findByJoinLink(joinLink: String): GroupEntity?
    fun save(group: GroupEntity): GroupEntity

    @Query("SELECT g FROM GroupEntity g WHERE :user MEMBER OF g.users")
    fun findGroupEntitiesByUser(user: UserEntity): List<GroupEntity>
}