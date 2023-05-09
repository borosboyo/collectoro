package hu.bme.aut.collectoro.dto.transaction

import hu.bme.aut.collectoro.domain.transaction.Currency
import hu.bme.aut.collectoro.domain.transaction.TransactionType

class ProcessTransactionReq (
    val purpose: String,
    val currency: Currency,
    val type: TransactionType,
    val who: HashMap<Long, Double>,
    val forWhom: HashMap<Long, Double>,
    val groupEntityId: Long
) {
}