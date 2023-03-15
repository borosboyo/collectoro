package hu.bme.aut.collectoro.service

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

}