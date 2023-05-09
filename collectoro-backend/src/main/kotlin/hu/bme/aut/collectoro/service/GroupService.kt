package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.domain.GroupEntity
import hu.bme.aut.collectoro.dto.group.*
import hu.bme.aut.collectoro.repository.GroupRepository
import hu.bme.aut.collectoro.repository.UserRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class GroupService(
    private val groupRepository: GroupRepository, private val userRepository: UserRepository
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
        val user = userRepository.findById(req.userId).get()
        val group = groupRepository.save(GroupEntity.Builder()
            .name(req.name)
            .users(mutableListOf(user))
            .build())

        return CreateGroupResp(group)
    }

    @Transactional
    fun deleteGroup(req: DeleteGroupReq): DeleteGroupResp {
        groupRepository.deleteById(req.groupId)
        return DeleteGroupResp()
    }


    @Transactional
    fun joinGroup(req: JoinGroupReq): JoinGroupResp {
        val group = groupRepository.findByJoinLink(req.joinLink)
        val user = userRepository.findById(req.userId).get()
        if(group !== null) {
            group.users.add(user)
            groupRepository.save(group)
            user.groupEntities.add(group)
            //user.wallets.add(group.wallet)
            userRepository.save(user)
        }
        return JoinGroupResp()
    }


}