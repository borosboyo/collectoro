package hu.bme.aut.collectoro.core.transaction.dto

import hu.bme.aut.collectoro.core.transaction.util.Currency
import hu.bme.aut.collectoro.core.transaction.util.TransactionType
import hu.bme.aut.collectoro.core.transaction.util.UserWithAmount

data class ProcessTransactionReq(
    var purpose: String,
    var currency: Currency,
    var type: TransactionType,
    var who: MutableList<UserWithAmount>,
    var forWhom: MutableList<UserWithAmount>,
    var groupEntityId: Long
)