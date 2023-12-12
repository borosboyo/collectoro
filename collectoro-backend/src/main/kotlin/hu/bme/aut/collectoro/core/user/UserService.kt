package hu.bme.aut.collectoro.core.user

import hu.bme.aut.collectoro.core.group.GroupRepository
import hu.bme.aut.collectoro.core.transaction.util.UserWithAmountType
import hu.bme.aut.collectoro.core.user.dto.*
import hu.bme.aut.collectoro.shared.provider.Provider
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
    private val groupRepository: GroupRepository
) {

    @Transactional
    fun getUserById(req: GetUserByIdReq): GetUserByIdResp {
        val resp = GetUserByIdResp()
        resp.user = userRepository.findById(req.id!!).get()
        return resp
    }

    fun processOAuthPostLogin(email: String?) {
        if (email != null) {
            val existUser: UserEntity = userRepository.findByEmail(email).get()
            if (existUser == null) {
                val newUser = UserEntity(
                    email = email,
                    enabled = true,
                    provider = Provider.GOOGLE
                )
                userRepository.save(newUser)
            }
        }

    }

    @Transactional
    fun deleteUserByEmail(req: DeleteUserByEmailReq): DeleteUserByEmailResp {
        val user = userRepository.findByEmail(req.email).get()
        userRepository.delete(user)
        return DeleteUserByEmailResp(
            email = req.email
        )
    }

    @Transactional
    fun getUsersByGroupId(req: GetUsersByGroupIdReq): GetUsersByGroupIdResp {
        return GetUsersByGroupIdResp()
    }

    @Transactional
    fun getHomepageByUserEmail(req: GetHomepageByUserEmailReq): GetHomepageByUserEmailResp {
        val user = userRepository.findByEmail(req.email!!).get()
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
        return GetProfileByUserEmailResp(userRepository.findByEmail(req.email!!).get())
    }

    @Transactional
    fun getUsersByIds(req: GetUsersByIdsReq): GetUsersByIdsResp {
        val resp = GetUsersByIdsResp()
        resp.users = userRepository.findByIdIn(req.ids)
        return resp
    }

    @Transactional
    fun editUserName(req: EditUserNameReq): EditUserNameResp {
        val user = userRepository.findByEmail(req.email).get()
        user.firstName = req.firstName
        user.lastName = req.lastName
        return EditUserNameResp(
            user = userRepository.save(user)
        )
    }
}