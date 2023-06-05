package hu.bme.aut.collectoro.dto.transaction

import hu.bme.aut.collectoro.domain.transaction.Debt

class ProcessTransactionResp(
    var debtBalanceResult : List<Debt>? = null
) {
    override fun toString(): String {
        return "ProcessTransactionResp(debtBalanceResult=$debtBalanceResult)"
    }
}