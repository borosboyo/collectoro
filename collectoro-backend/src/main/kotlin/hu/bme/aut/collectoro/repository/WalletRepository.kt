package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.domain.Wallet
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface WalletRepository: JpaRepository<Wallet, Long> {
}