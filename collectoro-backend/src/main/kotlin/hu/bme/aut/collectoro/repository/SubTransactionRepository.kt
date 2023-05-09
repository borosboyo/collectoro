package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.domain.transaction.SubTransaction
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface SubTransactionRepository: JpaRepository<SubTransaction, Long> {
}