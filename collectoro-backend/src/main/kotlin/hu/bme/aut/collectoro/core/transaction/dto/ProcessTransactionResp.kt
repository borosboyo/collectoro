package hu.bme.aut.collectoro.core.transaction.dto

import hu.bme.aut.collectoro.core.transaction.util.Debt

class ProcessTransactionResp(
    var debtBalanceResult: List<Debt>? = null
) {
    override fun toString(): String {
        return "ProcessTransactionResp(debtBalanceResult=$debtBalanceResult)"
    }
}