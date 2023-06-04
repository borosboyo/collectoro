package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.domain.Balance
import hu.bme.aut.collectoro.domain.GroupEntity
import hu.bme.aut.collectoro.domain.UserEntity
import hu.bme.aut.collectoro.domain.transaction.*
import hu.bme.aut.collectoro.domain.transaction.Currency
import hu.bme.aut.collectoro.dto.group.*
import hu.bme.aut.collectoro.repository.BalanceRepository
import hu.bme.aut.collectoro.repository.GroupRepository
import hu.bme.aut.collectoro.repository.UserRepository
import jakarta.transaction.Transactional
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.kotlin.any
import org.mockito.Mockito.`when`
import org.mockito.Mockito.verify
import org.springframework.boot.test.context.SpringBootTest
import java.util.*

@SpringBootTest
@Transactional
class GroupServiceTest {

    private val groupRepository: GroupRepository = Mockito.mock(GroupRepository::class.java)
    private val userRepository: UserRepository = Mockito.mock(UserRepository::class.java)
    private val balanceRepository: BalanceRepository = Mockito.mock(BalanceRepository::class.java)
    private val transactionService: TransactionService = Mockito.mock(TransactionService::class.java)

    private val groupService = GroupService(
        groupRepository,
        userRepository,
        balanceRepository,
        transactionService
    )

    @Test
    fun testGetGroupById() {
        // Arrange
        val groupId = 888L
        val groupEntity = GroupEntity(id = groupId, name = "Group 1")
        val req = GetGroupByIdReq()
        req.groupId = groupId

        `when`(groupRepository.findById(groupId)).thenReturn(Optional.of(groupEntity))

        // Act
        val resp = groupService.getGroupById(req)

        // Assert
        assertEquals(groupEntity, resp.group)
    }

    @Test
    fun testGetGroupsByUser() {
        // Arrange
        val userId = 888L
        val user = UserEntity.Builder().id(userId).email("john.doe@example.com").build()
        val req = GetGroupByUserReq()
        req.userId = userId

        `when`(userRepository.findById(userId)).thenReturn(Optional.of(user))
        `when`(groupRepository.findByUsers(user)).thenReturn(listOf(GroupEntity()))

        // Act
        val resp = groupService.getGroupsByUser(req)

        // Assert
        assertEquals(1, resp.groups.size)
    }

    @Test
    fun testCreateGroup() {
        // Arrange
        val userEmail = "john.doe@example.com"
        val req = CreateGroupReq()
        req.userEmail = userEmail
        req.name = "Group 1"
        var user = UserEntity.Builder().id(888L).email(userEmail).build()
        var groupEntity = GroupEntity.Builder().id(888L).name("Group 1").users(mutableListOf(user)).build()
        user.groups.add(groupEntity)
        val balance = Balance(
            groupId = groupEntity.id,
            wallet = user.wallet,
            currency = Currency.HUF,
            amount = 0.0
        )

        `when`(userRepository.findByEmail(userEmail)).thenReturn(user)
        `when`(groupRepository.save(any())).thenReturn(groupEntity)

        `when`(balanceRepository.save(any())).thenReturn(balance)

        // Act
        val resp = groupService.createGroup(req)

        // Assert
        verify(userRepository).save(user)
        assertNotNull(resp.group)
        assertEquals(groupEntity, resp.group)
    }




    @Test
    fun testDeleteGroup() {
        // Arrange
        val groupId = 888L
        val req = DeleteGroupReq(groupId)

        // Act
        val resp = groupService.deleteGroup(req)

        // Assert
        verify(groupRepository).deleteById(groupId)
        assertEquals(resp, resp)
    }

    @Test
    fun testJoinGroup() {
        // Arrange
        val joinLink = "abcd1234"
        val userEmail = "john.doe@example.com"
        val req = JoinGroupReq(joinLink, userEmail)
        val group = GroupEntity(id = 888L, joinLink = joinLink)
        val user = UserEntity.Builder().id(888L).email(userEmail).build()
        val balance = Balance(
            groupId = group.id,
            wallet = user.wallet,
            currency = Currency.HUF,
            amount = 0.0
        )

        `when`(groupRepository.findByJoinLink(joinLink)).thenReturn(group)
        `when`(userRepository.findByEmail(userEmail)).thenReturn(user)
        `when`(groupRepository.save(group)).thenReturn(group)
        `when`(balanceRepository.save(any())).thenReturn(balance)

        // Act
        val resp = groupService.joinGroup(req)

        // Assert
        assertEquals(resp, resp)
    }

    @Test
    fun testLeaveGroup() {
        // Arrange
        val groupId = 888L
        val userEmail = "john.doe@example.com"
        val req = LeaveGroupReq()
        req.groupId = groupId
        req.userEmail = userEmail
        val group = GroupEntity(id = groupId)
        val user = UserEntity.Builder().id(888L).email(userEmail).build()
        `when`(groupRepository.findById(groupId)).thenReturn(Optional.of(group))
        `when`(userRepository.findByEmail(userEmail)).thenReturn(user)

        // Act
        val resp = groupService.leaveGroup(req)

        // Assert
        verify(groupRepository).save(group)
        verify(userRepository).save(user)
        assertEquals(resp, resp)
    }

    @Test
    fun testGetGroupPageAdditionalData() {
        // Arrange
        val groupId = 888L
        val req = GetGroupPageAdditionalDataReq()
        req.groupId = groupId
        val group = GroupEntity(id = groupId)
        val expenseTransaction1 = Transaction(type = TransactionType.EXPENSE, who = mutableListOf(UserWithAmount.Builder().userId(2).lastName("Test2").amount(100.0).build()))
        val expenseTransaction2 = Transaction(type = TransactionType.EXPENSE, who = mutableListOf(UserWithAmount.Builder().userId(3).lastName("Test3").amount(100.0).build()))
        group.transactions.addAll(listOf(expenseTransaction1, expenseTransaction2))
        val debtList = mutableListOf<Debt>()

        `when`(groupRepository.findById(groupId)).thenReturn(Optional.of(group))
        `when`(transactionService.balanceOutBalances(groupId)).thenReturn(debtList)

        // Act
        val resp = groupService.getGroupPageAdditionalData(req)

        // Assert
        assertEquals(200.0, resp.totalSpent)
        assertEquals(2, resp.numberOfExpenses)
        assertEquals(debtList, resp.debtList)
    }
}
