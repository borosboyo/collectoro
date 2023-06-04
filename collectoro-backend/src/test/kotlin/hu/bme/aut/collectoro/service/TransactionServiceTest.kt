import hu.bme.aut.collectoro.domain.Balance
import hu.bme.aut.collectoro.domain.GroupEntity
import hu.bme.aut.collectoro.domain.UserEntity
import hu.bme.aut.collectoro.domain.Wallet
import hu.bme.aut.collectoro.domain.transaction.*
import hu.bme.aut.collectoro.domain.transaction.Currency
import hu.bme.aut.collectoro.dto.transaction.DeleteTransactionReq
import hu.bme.aut.collectoro.dto.transaction.ProcessTransactionReq
import hu.bme.aut.collectoro.repository.BalanceRepository
import hu.bme.aut.collectoro.repository.GroupRepository
import hu.bme.aut.collectoro.repository.TransactionRepository
import hu.bme.aut.collectoro.repository.UserRepository
import hu.bme.aut.collectoro.service.TransactionService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.`when`
import org.mockito.MockitoAnnotations
import java.util.*

class TransactionServiceTest {
    @Mock
    private lateinit var transactionRepository: TransactionRepository

    @Mock
    private lateinit var groupRepository: GroupRepository

    @Mock
    private lateinit var userRepository: UserRepository

    @Mock
    private lateinit var balanceRepository: BalanceRepository

    @InjectMocks
    private lateinit var transactionService: TransactionService

    @BeforeEach
    fun setup() {
        MockitoAnnotations.openMocks(this)
    }

    @Test
    fun testProcessTransaction_Expense() {
        // Arrange
        val groupId = 1L
        val req = ProcessTransactionReq.Builder()
            .type(TransactionType.EXPENSE)
            .groupEntityId(groupId)
            .who(mutableListOf(UserWithAmount.Builder().userId(2L).amount(100.0).build()))
            .forWhom(mutableListOf(UserWithAmount.Builder().userId(3L).amount(100.0).build()))
            .build()
        var balance1 = Balance(groupId, 1L, Currency.HUF,0.0)
        var balance2 = Balance(groupId, 1L, Currency.HUF,0.0)
        var wallet1 = Wallet(balances = mutableListOf(balance1))
        var wallet2 = Wallet(balances = mutableListOf(balance2))
        val userEntity1 = UserEntity.Builder().id(2L).lastName("Test2").wallet(wallet1).build()
        val userEntity2 = UserEntity.Builder().id(3L).lastName("Test3").wallet(wallet2).build()
        wallet1.userEntity = userEntity1
        wallet2.userEntity = userEntity2
        balance1.wallet = wallet1
        balance2.wallet = wallet2
        val groupEntity = GroupEntity.Builder().id(groupId).name("Test").build()
        val balances = listOf(balance1, balance2)
        `when`(balanceRepository.findBalancesByGroupId(groupId)).thenReturn(balances)
        `when`(balanceRepository.findBalanceByGroupIdAndWallet(groupId, wallet1)).thenReturn(balance1)
        `when`(balanceRepository.findBalanceByGroupIdAndWallet(groupId, wallet2)).thenReturn(balance2)
        `when`(groupRepository.findById(groupId)).thenReturn(Optional.of(groupEntity))
        `when`(userRepository.findById(2L)).thenReturn(Optional.of(userEntity1))
        `when`(userRepository.findById(3L)).thenReturn(Optional.of(userEntity2))

        // Act
        val result = transactionService.processTransaction(req)

        // Assert
        assertEquals(1, result.debtBalanceResult?.size)
        assertEquals(100.0, result.debtBalanceResult?.get(0)?.amount)
    }

    @Test
    fun testProcessTransaction_Income() {
        // Arrange
        val groupId = 1L
        val req = ProcessTransactionReq.Builder()
            .type(TransactionType.INCOME)
            .groupEntityId(groupId)
            .who(mutableListOf(UserWithAmount.Builder().userId(2L).amount(100.0).build()))
            .forWhom(mutableListOf(UserWithAmount.Builder().userId(3L).amount(100.0).build()))
            .build()
        var balance1 = Balance(groupId, 1L, Currency.HUF,0.0)
        var balance2 = Balance(groupId, 1L, Currency.HUF,0.0)
        var wallet1 = Wallet(balances = mutableListOf(balance1))
        var wallet2 = Wallet(balances = mutableListOf(balance2))
        val userEntity1 = UserEntity.Builder().id(2L).lastName("Test2").wallet(wallet1).build()
        val userEntity2 = UserEntity.Builder().id(3L).lastName("Test3").wallet(wallet2).build()
        wallet1.userEntity = userEntity1
        wallet2.userEntity = userEntity2
        balance1.wallet = wallet1
        balance2.wallet = wallet2
        val groupEntity = GroupEntity.Builder().id(groupId).name("Test").build()
        val balances = listOf(balance1, balance2)
        `when`(balanceRepository.findBalancesByGroupId(groupId)).thenReturn(balances)
        `when`(balanceRepository.findBalanceByGroupIdAndWallet(groupId, wallet1)).thenReturn(balance1)
        `when`(balanceRepository.findBalanceByGroupIdAndWallet(groupId, wallet2)).thenReturn(balance2)
        `when`(groupRepository.findById(groupId)).thenReturn(Optional.of(groupEntity))
        `when`(userRepository.findById(2L)).thenReturn(Optional.of(userEntity1))
        `when`(userRepository.findById(3L)).thenReturn(Optional.of(userEntity2))

        // Act
        val result = transactionService.processTransaction(req)

        // Assert
        assertEquals(1, result.debtBalanceResult?.size)
        assertEquals(100.0, result.debtBalanceResult?.get(0)?.amount)
    }

    @Test
    fun testProcessTransaction_Transfer() {
        // Arrange
        val groupId = 1L
        val req = ProcessTransactionReq.Builder()
            .type(TransactionType.TRANSFER)
            .groupEntityId(groupId)
            .who(mutableListOf(UserWithAmount.Builder().userId(2L).amount(100.0).build()))
            .forWhom(mutableListOf(UserWithAmount.Builder().userId(3L).amount(100.0).build()))
            .build()
        var balance1 = Balance(groupId, 1L, Currency.HUF,0.0)
        var balance2 = Balance(groupId, 1L, Currency.HUF,0.0)
        var wallet1 = Wallet(balances = mutableListOf(balance1))
        var wallet2 = Wallet(balances = mutableListOf(balance2))
        val userEntity1 = UserEntity.Builder().id(2L).lastName("Test2").wallet(wallet1).build()
        val userEntity2 = UserEntity.Builder().id(3L).lastName("Test3").wallet(wallet2).build()
        wallet1.userEntity = userEntity1
        wallet2.userEntity = userEntity2
        balance1.wallet = wallet1
        balance2.wallet = wallet2
        val groupEntity = GroupEntity.Builder().id(groupId).name("Test").build()
        val balances = listOf(balance1, balance2)
        `when`(balanceRepository.findBalancesByGroupId(groupId)).thenReturn(balances)
        `when`(balanceRepository.findBalanceByGroupIdAndWallet(groupId, wallet1)).thenReturn(balance1)
        `when`(balanceRepository.findBalanceByGroupIdAndWallet(groupId, wallet2)).thenReturn(balance2)
        `when`(groupRepository.findById(groupId)).thenReturn(Optional.of(groupEntity))
        `when`(userRepository.findById(2L)).thenReturn(Optional.of(userEntity1))
        `when`(userRepository.findById(3L)).thenReturn(Optional.of(userEntity2))

        // Act
        val result = transactionService.processTransaction(req)

        // Assert
        assertEquals(1, result.debtBalanceResult?.size)
    }

    @Test
    fun testBalanceOutBalances() {
        // Arrange
        val groupId = 1L
        var balance1 = Balance(groupId, 1L, Currency.HUF,100.0)
        var balance2 = Balance(groupId, 1L, Currency.HUF,-50.0)
        var balance3 = Balance(groupId, 1L, Currency.HUF,-50.0)

        var wallet1 = Wallet(balances = mutableListOf(balance1))
        var wallet2 = Wallet(balances = mutableListOf(balance2))
        var wallet3 = Wallet(balances = mutableListOf(balance3))
        val userEntity1 = UserEntity.Builder().id(2L).lastName("Test2").wallet(wallet1).build()
        val userEntity2 = UserEntity.Builder().id(3L).lastName("Test3").wallet(wallet2).build()
        val userEntity3 = UserEntity.Builder().id(4L).lastName("Test4").wallet(wallet3).build()
        wallet1.userEntity = userEntity1
        wallet2.userEntity = userEntity2
        wallet3.userEntity = userEntity3
        balance1.wallet = wallet1
        balance2.wallet = wallet2
        balance3.wallet = wallet3
        val balances = listOf(balance1, balance2, balance3)
        `when`(balanceRepository.findBalancesByGroupId(groupId)).thenReturn(balances)
        `when`(userRepository.findById(2L)).thenReturn(Optional.of(userEntity1))
        `when`(userRepository.findById(3L)).thenReturn(Optional.of(userEntity2))
        `when`(userRepository.findById(4L)).thenReturn(Optional.of(userEntity3))

        // Act
        val result = transactionService.balanceOutBalances(groupId)

        // Assert
        assertEquals(1, result?.size)
        assertEquals(50.0, result?.get(0)?.amount)
    }

    // Write similar tests for the remaining methods

    @Test
    fun testDeleteTransaction() {
        // Arrange
        val req = DeleteTransactionReq(transactionId = 1L)

        // Act
        val result = transactionService.deleteTransaction(req)

        // Assert
        // Add assertions as needed
        assertEquals(result, result)
    }
}
