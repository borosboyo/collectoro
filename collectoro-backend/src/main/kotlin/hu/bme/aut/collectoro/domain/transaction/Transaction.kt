package hu.bme.aut.collectoro.domain.transaction

import hu.bme.aut.collectoro.domain.GroupEntity
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
open class Transaction(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    open val id: Long = 0,
    open val purpose: String = "",
    open val date: LocalDateTime = LocalDateTime.now(),
    open val currency: Currency = Currency.HUF,
    open val type: TransactionType,

    @ElementCollection
    open val who: HashMap<Long, Double> = HashMap<Long, Double>(),

    @ElementCollection
    open val forWhom: HashMap<Long, Double> = HashMap<Long, Double>(),

    @ManyToOne
    @JoinColumn(name = "transactions")
    open val groupEntity: GroupEntity = GroupEntity()
) {
}