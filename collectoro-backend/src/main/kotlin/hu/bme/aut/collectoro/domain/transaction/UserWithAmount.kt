package hu.bme.aut.collectoro.domain.transaction

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import jakarta.persistence.*

@Entity
open class UserWithAmount(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    open var id: Long = 0,
    open var userId: Long = 0,
    open var amount: Double = 0.0,
    open var lastName: String = "",

    open var type: UserWithAmountType = UserWithAmountType.WHO,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(name = "transaction_userwithamount",
        joinColumns = [JoinColumn(name = "userwithamount_id")]
    )
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
    open var transaction: Transaction? = null
) {
    data class Builder(
        var id: Long = 0,
        var userId: Long = 0,
        var amount: Double = 0.0,
        var lastName: String = "",
        var type: UserWithAmountType = UserWithAmountType.WHO,
        var transaction: Transaction? = null
    ) {
        fun id(id: Long) = apply { this.id = id }
        fun userId(userId: Long) = apply { this.userId = userId }
        fun amount(amount: Double) = apply { this.amount = amount }
        fun lastName(lastName: String) = apply { this.lastName = lastName }
        fun type(type: UserWithAmountType) = apply { this.type = type }
        fun transaction(transaction: Transaction) = apply { this.transaction = transaction }
        fun build() = UserWithAmount(id, userId, amount, lastName, type, transaction)
    }
}