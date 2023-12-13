package hu.bme.aut.collectoro.core.group

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.annotation.ObjectIdGenerators
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
data class GroupEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,
    var name: String? = null,

    @ManyToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JsonManagedReference(value="groupUsers")
    var users: MutableList<UserEntity> = ArrayList(),

    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JsonManagedReference(value="groupTransactions")
    var transactions: MutableList<Transaction> = mutableListOf(),

    var joinLink: String? = UUID.randomUUID().toString(),

    @Enumerated(EnumType.STRING)
    var currency: Currency = Currency.HUF,

    var archived: Boolean = false,

    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JsonManagedReference(value="groupRoles")
    var groupRoles: MutableList<GroupRole> = mutableListOf(),

    var color: String? = null

    ) : Serializable

@Repository
interface GroupRepository : JpaRepository<GroupEntity, Long> {
    fun findByUsers(user: UserEntity): List<GroupEntity>

    fun findByJoinLink(joinLink: String): Optional<GroupEntity>
    fun save(group: GroupEntity): GroupEntity

    @Query("SELECT g FROM GroupEntity g WHERE :user MEMBER OF g.users")
    fun findGroupEntitiesByUser(user: UserEntity): List<GroupEntity>
}