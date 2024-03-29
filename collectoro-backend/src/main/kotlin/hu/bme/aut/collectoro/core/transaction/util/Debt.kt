package hu.bme.aut.collectoro.core.transaction.util

import java.util.*

class Debt(
    var id: UUID = UUID.randomUUID(),
    var fromUserId: Long = 0,
    var fromUserLastName: String? = null,
    var toUserId: Long = 0,
    var toUserLastName: String? = null,
    var amount: Double = 0.0
) {
    data class Builder(
        var id: UUID = UUID.randomUUID(),
        var fromUserId: Long = 0,
        var fromUserLastName: String? = null,
        var toUserId: Long = 0,
        var toUserLastName: String? = null,
        var amount: Double = 0.0
    ) {
        fun id(id: UUID) = apply { this.id = id }
        fun fromUserId(fromId: Long) = apply { this.fromUserId = fromId }
        fun fromUserLastName(fromLastName: String?) = apply { this.fromUserLastName = fromLastName }
        fun toUserId(toId: Long) = apply { this.toUserId = toId }
        fun toUserLastName(toLastName: String?) = apply { this.toUserLastName = toLastName }
        fun amount(amount: Double) = apply { this.amount = amount }
        fun build() = Debt(id, fromUserId, fromUserLastName, toUserId, toUserLastName, amount)
    }

}