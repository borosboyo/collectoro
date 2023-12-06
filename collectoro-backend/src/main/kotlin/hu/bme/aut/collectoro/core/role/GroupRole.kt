package hu.bme.aut.collectoro.core.role

import com.fasterxml.jackson.annotation.JsonBackReference
import hu.bme.aut.collectoro.core.group.GroupEntity
import hu.bme.aut.collectoro.core.user.UserEntity
import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.io.Serializable

@Entity
data class GroupRole(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    @Enumerated(EnumType.STRING)
    var groupRole: GroupRoleEnum? = null,

    @ManyToOne
    @JsonBackReference
    var userEntity: UserEntity,

    @ManyToOne
    @JsonBackReference
    var group: GroupEntity? = null
) : Serializable

@Repository
interface GroupRoleRepository : JpaRepository<GroupRole, Long>