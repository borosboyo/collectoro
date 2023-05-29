package hu.bme.aut.collectoro.domain.transaction

class Debt(
    var fromUserId : Long = 0,
    var toUserId : Long = 0,
    var amount : Double = 0.0
) {
    data class Builder(
        var fromUserId : Long = 0,
        var toUserId : Long = 0,
        var amount : Double = 0.0
    ) {
        fun fromUserId(fromId: Long) = apply { this.fromUserId = fromId }
        fun toUserId(toId: Long) = apply { this.toUserId = toId }
        fun amount(amount: Double) = apply { this.amount = amount }
        fun build() = Debt(fromUserId, toUserId, amount)
    }

}