package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.core.group.GroupEntity
import hu.bme.aut.collectoro.core.group.GroupRepository
import hu.bme.aut.collectoro.core.group.GroupService
import hu.bme.aut.collectoro.core.group.dto.*
import hu.bme.aut.collectoro.core.role.GroupRole
import hu.bme.aut.collectoro.core.role.GroupRoleEnum
import hu.bme.aut.collectoro.core.role.GroupRoleRepository
import hu.bme.aut.collectoro.core.transaction.Transaction
import hu.bme.aut.collectoro.core.transaction.TransactionService
import hu.bme.aut.collectoro.core.transaction.util.*
import hu.bme.aut.collectoro.core.transaction.util.Currency
import hu.bme.aut.collectoro.core.user.UserEntity
import hu.bme.aut.collectoro.core.user.UserRepository
import jakarta.transaction.Transactional
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.Mockito.*
import org.mockito.kotlin.any
import org.springframework.boot.test.context.SpringBootTest
import java.util.*

@SpringBootTest
@Transactional
class GroupServiceTest {

    private val groupRepository: GroupRepository = Mockito.mock(GroupRepository::class.java)
    private val userRepository: UserRepository = Mockito.mock(UserRepository::class.java)
    private val balanceRepository: BalanceRepository = Mockito.mock(BalanceRepository::class.java)
    private val transactionService: TransactionService = Mockito.mock(TransactionService::class.java)
    private val groupRoleRepository: GroupRoleRepository = Mockito.mock(GroupRoleRepository::class.java)

    private val groupService = GroupService(
        groupRepository,
        userRepository,
        balanceRepository,
        transactionService,
        groupRoleRepository
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
        val user = UserEntity(
            id = userId,
            email = "john@doe.example.com"
        )
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
        val req = CreateGroupReq(
            userEmail = userEmail,
            name = "Group 1",
            selectedColorName = "red"
        )
        req.userEmail = userEmail
        req.name = "Group 1"
        val user = UserEntity(
            id = 888L,
            email = userEmail
        )
        val groupEntity = GroupEntity(
            id = 888L,
            name = req.name,
            users = mutableListOf(user),
            color = req.selectedColorName
        )
        user.groups.add(groupEntity)
        val balance = Balance(
            groupId = groupEntity.id,
            wallet = user.wallet,
            currency = Currency.HUF,
            amount = 0.0
        )
        val groupRole = GroupRole(
            id = 1L,
            userEmail = user.getEmail(),
            groupRole = GroupRoleEnum.ADMIN,
        )

        `when`(groupRoleRepository.save(any())).thenReturn(groupRole)
        `when`(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(user))
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
        val user = UserEntity(
            id = 888L,
            email = userEmail
        )
        val balance = Balance(
            groupId = group.id,
            wallet = user.wallet,
            currency = Currency.HUF,
            amount = 0.0
        )
        val groupRole = GroupRole(
            id = 1L,
            userEmail = user.getEmail(),
            groupRole = GroupRoleEnum.ADMIN,
        )

        `when`(groupRoleRepository.save(any())).thenReturn(groupRole)
        `when`(groupRepository.findByJoinLink(anyString())).thenReturn(Optional.of(group))
        `when`(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user))
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
        val user = UserEntity(
            id = 888L,
            email = userEmail
        )
        val groupRole = GroupRole(
            id = 1L,
            userEmail = user.getEmail(),
            groupRole = GroupRoleEnum.ADMIN,
        )
        group.groupRoles.add(groupRole)
        `when`(groupRepository.findById(groupId)).thenReturn(Optional.of(group))
        `when`(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(user))
        `when`(groupRoleRepository.findById(any())).thenReturn(Optional.of(groupRole))

        // Act
        val resp = groupService.leaveGroup(req)

        // Assert
        assertEquals(resp, resp)
    }

    @Test
    fun testGetGroupPageAdditionalData() {
        // Arrange
        val groupId = 888L
        val req = GetGroupPageAdditionalDataReq(
            groupId = groupId
        )
        req.groupId = groupId
        val group = GroupEntity(id = groupId)
        val expenseTransaction1 = Transaction(
            type = TransactionType.EXPENSE, who = mutableListOf(
                UserWithAmount(
                    userId = 2,
                    lastName = "Test2",
                    amount = 100.0
                )
            )
        )
        val expenseTransaction2 = Transaction(
            type = TransactionType.EXPENSE, who = mutableListOf(
                UserWithAmount(
                    userId = 3,
                    lastName = "Test3",
                    amount = 100.0
                )
            )
        )
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

    @Test
    fun testEditGroup() {
        // Arrange
        val group = GroupEntity(id = 888L, name = "Group 1", color = "red")
        val req = EditGroupReq(
            groupId = group.id,
            name = "Group 2",
            selectedColorName = "blue")

        `when`(groupRepository.findById(group.id)).thenReturn(Optional.of(group))
        `when`(groupRepository.save(any())).thenReturn(group)

        // Act
        val resp = groupService.editGroup(req)

        // Assert
        assertEquals(group, resp.group)
    }

    @Test
    fun testToggleGroupArchive() {
        // Arrange
        val groupId = 888L
        val req = ToggleGroupArchiveReq(groupId)
        val group = GroupEntity(id = groupId, archived = false)

        `when`(groupRepository.findById(groupId)).thenReturn(Optional.of(group))
        `when`(groupRepository.save(any())).thenReturn(group)

        // Act
        val resp = groupService.toggleGroupArchive(req)

        // Assert
        assertEquals(group, resp.group)
    }

    @Test
    fun testKickUserFromGroup() {
        // Arrange
        val groupId = 888L
        val userId = 999L
        val req = KickUserFromGroupReq(groupId, userId)
        val group = GroupEntity(id = groupId)
        val user = UserEntity(id = userId)

        `when`(groupRepository.findById(groupId)).thenReturn(Optional.of(group))
        `when`(userRepository.findById(userId)).thenReturn(Optional.of(user))
        `when`(groupRepository.save(any())).thenReturn(group)

        // Act
        val resp = groupService.kickUserFromGroup(req)

        // Assert
        assertEquals(group, resp.group)
    }
}
