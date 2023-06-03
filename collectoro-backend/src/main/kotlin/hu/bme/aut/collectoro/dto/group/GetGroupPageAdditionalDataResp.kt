package hu.bme.aut.collectoro.dto.group

import hu.bme.aut.collectoro.domain.transaction.Debt

class GetGroupPageAdditionalDataResp(
    var totalSpent: Double,
    var numberOfExpenses: Int,
    var debtList: MutableList<Debt>? = null
) {
}