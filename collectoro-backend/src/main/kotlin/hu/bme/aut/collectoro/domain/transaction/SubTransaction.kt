package hu.bme.aut.collectoro.domain.transaction

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
class SubTransaction(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,
    var fromId: Long = 0,
    var toId: Long = 0,
    var amount: Double = 0.0
) {
    data class Builder(
        var id: Long = 0,
        var fromId: Long = 0,
        var toId: Long = 0,
        var amount: Double = 0.0
    ) {
        fun id(id: Long) = apply { this.id = id }
        fun fromId(fromId: Long) = apply { this.fromId = fromId }
        fun toId(toId: Long) = apply { this.toId = toId }
        fun amount(amount: Double) = apply { this.amount = amount }
        fun build() = SubTransaction(id, fromId, toId, amount)
    }
}