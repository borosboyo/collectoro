package hu.bme.aut.collectoro.domain

import hu.bme.aut.collectoro.domain.transaction.Currency
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne

@Entity
class Balance(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val groupId: Long = 0,
    val currency: Currency = Currency.HUF,
    var amount: Double,

    @ManyToOne
    @JoinColumn(name = "balances")
    val wallet: Wallet? = null
) {
}