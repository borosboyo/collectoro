package hu.bme.aut.collectoro.core.transaction.util

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import hu.bme.aut.collectoro.core.transaction.Transaction
import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.io.Serializable

@Entity
data class UserWithAmount(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    var userId: Long = 0,

    var amount: Double = 0.0,

    var lastName: String = "",

    @Enumerated(EnumType.STRING)
    var type: UserWithAmountType = UserWithAmountType.WHO,

    @ManyToOne
    @JsonBackReference(value="groupRoleTransaction")
    var transaction: Transaction? = null

) : Serializable

@Repository
interface UserWithAmountRepository : JpaRepository<UserWithAmount, Long>