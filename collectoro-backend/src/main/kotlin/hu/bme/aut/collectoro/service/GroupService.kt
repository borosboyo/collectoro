package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.domain.Balance
import hu.bme.aut.collectoro.domain.GroupEntity
import hu.bme.aut.collectoro.domain.transaction.Currency
import hu.bme.aut.collectoro.dto.group.*
import hu.bme.aut.collectoro.repository.BalanceRepository
import hu.bme.aut.collectoro.repository.GroupRepository
import hu.bme.aut.collectoro.repository.UserRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class GroupService(
    private val groupRepository: GroupRepository,
    private val userRepository: UserRepository,
    private val balanceRepository: BalanceRepository
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
        var user = userRepository.findByEmail(req.userEmail)
        if(user != null) {
            val group = groupRepository.save(
                GroupEntity.Builder()
                    .name(req.name)
                    .users(mutableListOf(user))
                    .build()
            )
            return CreateGroupResp(group)
        } else {
            return CreateGroupResp()
        }
    }

    @Transactional
    fun deleteGroup(req: DeleteGroupReq): DeleteGroupResp {
        groupRepository.deleteById(req.groupId)
        return DeleteGroupResp()
    }


    @Transactional
    fun joinGroup(req: JoinGroupReq): JoinGroupResp {
        var group = groupRepository.findByJoinLink(req.joinLink)
        var user = userRepository.findById(req.userId).get()
        if(group != null) {
            group.users.add(user)
            groupRepository.save(group)
            val balance = balanceRepository.save(Balance.Builder()
                .groupId(group.id)
                .wallet(user.wallet)
                .currency(Currency.HUF)
                .amount(0.0)
                .build())
            user.groupEntities.add(group)
            user.wallet?.balances?.add(balance)
            userRepository.save(user)
        }
        return JoinGroupResp()
    }


}