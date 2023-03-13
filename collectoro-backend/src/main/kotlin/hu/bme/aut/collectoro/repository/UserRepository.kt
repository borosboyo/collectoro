package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.domain.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository


@Repository
interface UserRepository : JpaRepository<User, Long> {
}