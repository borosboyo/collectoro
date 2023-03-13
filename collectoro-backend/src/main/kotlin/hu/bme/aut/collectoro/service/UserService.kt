package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.domain.User
import hu.bme.aut.collectoro.dto.UserDto
import hu.bme.aut.collectoro.repository.UserRepository
import jakarta.transaction.Transactional
import lombok.RequiredArgsConstructor
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {

    @Transactional
    fun findAll(): UserDto {
        return userRepository.findAll().map { UserDto(it) }.first()
    }

    @Transactional
    fun findById(id: Long): UserDto {
        return UserDto(userRepository.findById(id).get())
    }
}