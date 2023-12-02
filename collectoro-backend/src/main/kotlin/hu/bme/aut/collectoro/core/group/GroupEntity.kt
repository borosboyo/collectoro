package hu.bme.aut.collectoro.core.group

import hu.bme.aut.collectoro.core.role.GroupRole
import hu.bme.aut.collectoro.core.transaction.Transaction
import hu.bme.aut.collectoro.core.transaction.util.Currency
import hu.bme.aut.collectoro.core.user.UserEntity
import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.io.Serializable
import java.util.*

@Entity
@Table(name = "group_entity")
data class GroupEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,
    var name: String? = null,

    @ManyToMany(mappedBy = "groups")
    var users: MutableList<UserEntity> = ArrayList(),

    @OneToMany(mappedBy = "groupEntity")
    var transactions: MutableList<Transaction> = ArrayList(),

    var joinLink: String? = UUID.randomUUID().toString(),

    var currency: Currency = Currency.HUF,

    var archived: Boolean = false,

    @OneToMany(mappedBy = "group")
    var groupRoles: MutableList<GroupRole> = mutableListOf(),

    ) : Serializable

@Repository
interface GroupRepository : JpaRepository<GroupEntity, Long> {
    fun findByUsers(user: UserEntity): List<GroupEntity>

    fun findByJoinLink(joinLink: String): GroupEntity?
    fun save(group: GroupEntity): GroupEntity

    @Query("SELECT g FROM GroupEntity g WHERE :user MEMBER OF g.users")
    fun findGroupEntitiesByUser(user: UserEntity): List<GroupEntity>
}