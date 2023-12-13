package hu.bme.aut.collectoro.core.group

import hu.bme.aut.collectoro.core.group.dto.*
import hu.bme.aut.collectoro.core.role.GroupRole
import hu.bme.aut.collectoro.core.role.GroupRoleEnum
import hu.bme.aut.collectoro.core.role.GroupRoleRepository
import hu.bme.aut.collectoro.core.transaction.TransactionService
import hu.bme.aut.collectoro.core.transaction.util.Balance
import hu.bme.aut.collectoro.core.transaction.util.BalanceRepository
import hu.bme.aut.collectoro.core.transaction.util.Currency
import hu.bme.aut.collectoro.core.transaction.util.TransactionType
import hu.bme.aut.collectoro.core.user.UserRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class GroupService(
    private val groupRepository: GroupRepository,
    private val userRepository: UserRepository,
    private val balanceRepository: BalanceRepository,
    private val transactionService: TransactionService,
    private val groupRoleRepository: GroupRoleRepository
) {

    @Transactional
    fun getGroupById(req: GetGroupByIdReq): GetGroupByIdResp {
        return GetGroupByIdResp(groupRepository.findById(req.groupId).get())
    }

    @Transactional
    fun getGroupsByUser(req: GetGroupByUserReq): GetGroupByUserResp {
        val user = userRepository.findById(req.userId).get()
        return GetGroupByUserResp(groupRepository.findByUsers(user))
    }

    @Transactional
    fun createGroup(req: CreateGroupReq): CreateGroupResp {
        val user = userRepository.findByEmail(req.userEmail).get()
        val group = groupRepository.save(
            GroupEntity(
                name = req.name,
                users = mutableListOf(user),
                color = req.selectedColorName
            )
        )
        val groupRole = groupRoleRepository.save(
            GroupRole(
                group = group,
                userEmail = user.getEmail(),
                groupRole = GroupRoleEnum.ADMIN
            )
        )
        group.groupRoles.add(groupRole)
        val savedGroup = groupRepository.save(group)
        val balance = balanceRepository.save(
            Balance(
                groupId = group.id,
                wallet = user.wallet,
                currency = Currency.HUF,
                amount = 0.0
            )
        )
        user.groups.add(savedGroup)
        user.wallet?.balances?.add(balance)
        userRepository.save(user)
        return CreateGroupResp(savedGroup)
    }

    @Transactional
    fun editGroup(req: EditGroupReq): EditGroupResp {
        val group = groupRepository.findById(req.groupId).get()
        group.name = req.name
        group.color = req.selectedColorName
        return EditGroupResp(
            group = groupRepository.save(group)
        )
    }

    @Transactional
    fun toggleGroupArchive(req: ToggleGroupArchiveReq): ToggleGroupArchiveResp {
        val group = groupRepository.findById(req.groupId).get()
        group.archived = !group.archived
        return ToggleGroupArchiveResp(
            group = groupRepository.save(group)
        )
    }

    @Transactional
    fun deleteGroup(req: DeleteGroupReq): DeleteGroupResp {
        groupRepository.deleteById(req.groupId)
        return DeleteGroupResp()
    }


    @Transactional
    fun joinGroup(req: JoinGroupReq): JoinGroupResp {
        val group = groupRepository.findByJoinLink(req.joinLink).get()
        val user = userRepository.findByEmail(req.userEmail).get()
        if (group != null) {
            val groupRole = groupRoleRepository.save(
                GroupRole(
                    group = group,
                    userEmail = user.getEmail(),
                    groupRole = GroupRoleEnum.MEMBER
                )
            )
            group.users.add(user)
            group.groupRoles.add(groupRole)
            groupRepository.save(group)
            val balance = balanceRepository.save(
                Balance(
                    groupId = group.id,
                    wallet = user.wallet,
                    currency = Currency.HUF,
                    amount = 0.0
                )
            )
            user.groups.add(group)
            user.wallet?.balances?.add(balance)
            userRepository.save(user)
        }
        return JoinGroupResp()
    }

    @Transactional
    fun leaveGroup(req: LeaveGroupReq): LeaveGroupResp {
        val group = groupRepository.findById(req.groupId).get()
        val user = userRepository.findByEmail(req.userEmail).get()
        val groupRole = groupRoleRepository.findById(group.groupRoles.find { it.userEmail == user.getEmail() }!!.id).get()
        group.groupRoles.remove(groupRole)
        group.users.remove(user)
        groupRoleRepository.delete(groupRole)
        user.groups.remove(group)
        userRepository.save(user)
        groupRepository.delete(group)
        return LeaveGroupResp()
    }

    @Transactional
    fun kickUserFromGroup(req: KickUserFromGroupReq): KickUserFromGroupResp {
        val group = groupRepository.findById(req.groupId).get()
        val user = userRepository.findById(req.userId).get()
        //Todo grouproles
        group.users.remove(user)
        val savedGroup = groupRepository.save(group)
        user.groups.remove(group)
        userRepository.save(user)
        return KickUserFromGroupResp(
            group = savedGroup
        )
    }

    @Transactional
    fun getGroupPageAdditionalData(req: GetGroupPageAdditionalDataReq): GetGroupPageAdditionalDataResp {
        val group = groupRepository.findById(req.groupId).get()
        val expenseTransactions = group.transactions
            .filter { it.type == TransactionType.EXPENSE }

        val totalSpent = expenseTransactions
            .flatMap { it.who }
            .sumOf { it.amount }

        val debtList = transactionService.balanceOutBalances(req.groupId)
        val users = userRepository.findByIdIn(group.users.map { it.id })
        return GetGroupPageAdditionalDataResp(totalSpent, expenseTransactions.size, debtList, users)
    }

    private fun mapGroup(group: GroupEntity, req: GroupEntity) {
        group.name = req.name
        group.users = req.users
        group.archived = req.archived
        group.color = req.color
        group.groupRoles = req.groupRoles
        groupRepository.save(group)
    }
}