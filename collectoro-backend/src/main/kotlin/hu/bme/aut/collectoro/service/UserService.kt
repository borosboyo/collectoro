package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.domain.Provider
import hu.bme.aut.collectoro.domain.UserEntity
import hu.bme.aut.collectoro.dto.user.GetUserByIdTsReq
import hu.bme.aut.collectoro.dto.user.GetUserByIdTsResp
import hu.bme.aut.collectoro.repository.UserRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {

    @Transactional
    fun getUserById(req: GetUserByIdTsReq): GetUserByIdTsResp {
        val resp = GetUserByIdTsResp()
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

}