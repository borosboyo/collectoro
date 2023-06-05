package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.domain.Provider
import hu.bme.aut.collectoro.domain.UserEntity
import hu.bme.aut.collectoro.domain.transaction.UserWithAmountType
import hu.bme.aut.collectoro.dto.user.*
import hu.bme.aut.collectoro.repository.GroupRepository
import hu.bme.aut.collectoro.repository.UserRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
    private val groupRepository: GroupRepository) {

    @Transactional
    fun getUserById(req: GetUserByIdReq): GetUserByIdResp {
        val resp = GetUserByIdResp()
        resp.user = userRepository.findById(req.id!!).get()
        return resp
    }

    fun processOAuthPostLogin(email: String?) {
        if (email != null) {
            val existUser: UserEntity? = userRepository.findByEmail(email)
            if (existUser == null) {
                val newUser = UserEntity.Builder()
                    .firstName(email)
                    .provider(Provider.GOOGLE).build()
                userRepository.save(newUser)
            }
        }

    }

    @Transactional
    fun deleteUserById(req: DeleteUserByIdReq): DeleteUserByIdResp {
        userRepository.deleteById(req.userId)
        return DeleteUserByIdResp()
    }

    @Transactional
    fun getUsersByGroupId(req: GetUsersByGroupIdReq): GetUsersByGroupIdResp {
        return GetUsersByGroupIdResp()
    }

    @Transactional
    fun getHomepageByUserEmail(req: GetHomepageByUserEmailReq): GetHomepageByUserEmailResp {
        val user = userRepository.findByEmail(req.email!!)
        val groups = groupRepository.findGroupEntitiesByUser(user)
        for (group in groups) {
            for (transaction in group.transactions) {
                transaction.who.removeIf { it.type != UserWithAmountType.WHO }
                transaction.forWhom.removeIf { it.type != UserWithAmountType.FORWHOM }
            }
        }
        return GetHomepageByUserEmailResp(user, groups)
    }

    @Transactional
    fun getProfileByUserEmail(req: GetProfileByUserEmailReq): GetProfileByUserEmailResp {
        return GetProfileByUserEmailResp(userRepository.findByEmail(req.email!!))
    }

    @Transactional
    fun getUsersByIds(req: GetUsersByIdsReq): GetUsersByIdsResp {
        val resp = GetUsersByIdsResp()
        resp.users = userRepository.findByIdIn(req.ids)
        return resp
    }
}