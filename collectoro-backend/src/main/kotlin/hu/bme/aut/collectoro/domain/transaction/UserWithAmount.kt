package hu.bme.aut.collectoro.domain.transaction

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import jakarta.persistence.*

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
open class UserWithAmount(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    open val id: Long = 0,
    open var userId: Long = 0,
    open var amount: Double = 0.0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id")
    open var transaction: Transaction = Transaction()
) {
    data class Builder(
        var id: Long = 0,
        var userId: Long = 0,
        var amount: Double = 0.0,
        var transaction: Transaction = Transaction()
    ) {
        fun id(id: Long) = apply { this.id = id }
        fun userId(userId: Long) = apply { this.userId = userId }
        fun amount(amount: Double) = apply { this.amount = amount }
        fun transaction(transaction: Transaction) = apply { this.transaction = transaction }
        fun build() = UserWithAmount(id, userId, amount, transaction)
    }
}