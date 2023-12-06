package hu.bme.aut.collectoro.core.transaction.util

import com.fasterxml.jackson.annotation.JsonBackReference
import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.io.Serializable

@Entity
data class Balance(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    var groupId: Long = 0,

    @Enumerated(EnumType.STRING)
    var currency: Currency = Currency.HUF,

    var amount: Double,

    @ManyToOne
    @JsonBackReference
    var wallet: Wallet? = null

) : Serializable

@Repository
interface BalanceRepository : JpaRepository<Balance, Long> {
    fun findBalanceByGroupIdAndWallet(groupId: Long, wallet: Wallet): Balance
    fun findBalancesByGroupId(groupId: Long): List<Balance>
}