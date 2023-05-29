package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.domain.Balance
import hu.bme.aut.collectoro.domain.Wallet
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface BalanceRepository : JpaRepository<Balance, Long> {
    fun findBalanceByGroupIdAndWallet(groupId: Long, wallet: Wallet): Balance
    fun findBalancesByGroupId(groupId: Long): List<Balance>
}