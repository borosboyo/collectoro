package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.domain.Provider
import hu.bme.aut.collectoro.domain.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository


@Repository
interface UserRepository : JpaRepository<UserEntity, Long> {
    fun findByEmail(email: String): UserEntity
    fun findByEmailAndProvider(email: String, provider: Provider): UserEntity?

    //find users list based on array of ids
    fun findByIdIn(ids: List<Long>): List<UserEntity>
}