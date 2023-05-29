package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.domain.transaction.UserWithAmount
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserWithAmountRepository: JpaRepository<UserWithAmount, Long> {
}