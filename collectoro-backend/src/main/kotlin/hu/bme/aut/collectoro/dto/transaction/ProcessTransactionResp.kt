package hu.bme.aut.collectoro.dto.transaction

import hu.bme.aut.collectoro.domain.transaction.Debt

class ProcessTransactionResp(
    var debtBalanceResult : List<Debt>? = null
) {
}