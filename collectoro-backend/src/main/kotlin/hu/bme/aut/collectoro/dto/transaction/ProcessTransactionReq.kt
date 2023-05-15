package hu.bme.aut.collectoro.dto.transaction

import hu.bme.aut.collectoro.domain.transaction.Currency
import hu.bme.aut.collectoro.domain.transaction.TransactionType
import hu.bme.aut.collectoro.domain.transaction.UserWithAmount

class ProcessTransactionReq (
    var purpose: String,
    var currency: Currency,
    var type: TransactionType,
    var who: MutableList<UserWithAmount>,
    var forWhom: MutableList<UserWithAmount>,
    var groupEntityId: Long
) {

    data class Builder(
        var purpose: String = "",
        var currency: Currency = Currency.HUF,
        var type: TransactionType = TransactionType.EXPENSE,
        var who: MutableList<UserWithAmount>  = ArrayList<UserWithAmount>(),
        var forWhom: MutableList<UserWithAmount>  = ArrayList<UserWithAmount>(),
        var groupEntityId: Long = 0
    ) {
        fun purpose(purpose: String) = apply { this.purpose = purpose }
        fun currency(currency: Currency) = apply { this.currency = currency }
        fun type(type: TransactionType) = apply { this.type = type }
        fun who(who: MutableList<UserWithAmount>) = apply { this.who = who }
        fun forWhom(forWhom: MutableList<UserWithAmount>) = apply { this.forWhom = forWhom }
        fun groupEntityId(groupEntityId: Long) = apply { this.groupEntityId = groupEntityId }
        fun build() = ProcessTransactionReq(purpose, currency, type, who, forWhom, groupEntityId)
    }
}