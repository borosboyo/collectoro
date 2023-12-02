package hu.bme.aut.collectoro.core.group.dto

import hu.bme.aut.collectoro.core.transaction.util.Debt
import hu.bme.aut.collectoro.core.user.UserEntity

class GetGroupPageAdditionalDataResp(
    var totalSpent: Double,
    var numberOfExpenses: Int,
    var debtList: MutableList<Debt>? = null,
    var users: List<UserEntity>? = null
)