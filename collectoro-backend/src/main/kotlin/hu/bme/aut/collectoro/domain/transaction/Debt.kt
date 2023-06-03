package hu.bme.aut.collectoro.domain.transaction

class Debt(
    var fromUserId : Long = 0,
    var fromUserLastName: String? = null,
    var toUserId : Long = 0,
    var toUserLastName: String? = null,
    var amount : Double = 0.0
) {
    data class Builder(
        var fromUserId : Long = 0,
        var fromUserLastName: String? = null,
        var toUserId : Long = 0,
        var toUserLastName: String? = null,
        var amount : Double = 0.0
    ) {
        fun fromUserId(fromId: Long) = apply { this.fromUserId = fromId }
        fun fromUserLastName(fromLastName: String?) = apply { this.fromUserLastName = fromLastName }
        fun toUserId(toId: Long) = apply { this.toUserId = toId }
        fun toUserLastName(toLastName: String?) = apply { this.toUserLastName = toLastName }
        fun amount(amount: Double) = apply { this.amount = amount }
        fun build() = Debt(fromUserId, fromUserLastName, toUserId, toUserLastName, amount)
    }

}