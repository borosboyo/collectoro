package hu.bme.aut.collectoro.core.group

import com.fasterxml.jackson.annotation.JsonManagedReference
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

    @ManyToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JsonManagedReference
    var users: MutableList<UserEntity> = ArrayList(),

    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JsonManagedReference
    var transactions: MutableList<Transaction> = ArrayList(),

    var joinLink: String? = UUID.randomUUID().toString(),

    @Enumerated(EnumType.STRING)
    var currency: Currency = Currency.HUF,

    var archived: Boolean = false,

    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JsonManagedReference
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