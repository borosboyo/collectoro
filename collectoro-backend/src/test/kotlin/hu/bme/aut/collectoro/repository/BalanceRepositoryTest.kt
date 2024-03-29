package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.RepositoryTestConfig
import hu.bme.aut.collectoro.core.transaction.util.*
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.context.annotation.Import

@DataJpaTest
@Import(value = [RepositoryTestConfig::class])
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class BalanceRepositoryTest {

    @Autowired
    private lateinit var balanceRepository: BalanceRepository

    @Autowired
    private lateinit var walletRepository: WalletRepository

    @Test
    fun testFindBalanceByGroupIdAndWallet() {
        val wallet = Wallet(/* Initialize wallet properties */)
        val balance = Balance(
            groupId = 777L,
            currency = Currency.HUF,
            amount = 200.0,
            wallet = wallet
        )
        walletRepository.save(wallet)
        balanceRepository.save(balance)

        val foundBalance = balanceRepository.findBalanceByGroupIdAndWallet(groupId = 777L, wallet = wallet)
        assertEquals(balance, foundBalance)
    }

    @Test
    fun testFindBalancesByGroupId() {
        val wallet = Wallet(/* Initialize wallet properties */)
        val balance = Balance(
            groupId = 777L,
            currency = Currency.HUF,
            amount = 200.0,
            wallet = wallet
        )
        walletRepository.save(wallet)
        balanceRepository.save(balance)
        val foundBalances = balanceRepository.findBalancesByGroupId(groupId = 777L)
        println(foundBalances)
        assertEquals(1, foundBalances.size)
        assertEquals(balance, foundBalances[0])
    }
}
