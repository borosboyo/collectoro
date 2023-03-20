package hu.bme.aut.collectoro.domain.transaction

import hu.bme.aut.collectoro.domain.GroupEntity
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import java.time.LocalDateTime

@Entity
open class Transaction(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    open val id: Long = 0,
    open val purpose: String = "",
    open val amount: Double = 0.0,
    open val date: LocalDateTime = LocalDateTime.now(),
    open val currency: Currency = Currency.HUF,

    @ManyToOne
    @JoinColumn(name = "transactions")
    open val groupEntity: GroupEntity = GroupEntity()
) {
}