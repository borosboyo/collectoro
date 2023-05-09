package hu.bme.aut.collectoro.domain

import hu.bme.aut.collectoro.domain.transaction.Currency
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
class Balance(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val groupById: Long = 0,
    val currency: Currency = Currency.HUF,
    val amount: Double
) {
}