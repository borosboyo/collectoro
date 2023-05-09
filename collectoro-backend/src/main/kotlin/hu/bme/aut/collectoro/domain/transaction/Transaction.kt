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
    open val type: TransactionType? = TransactionType.EXPENSE,

    @ElementCollection
    open val who: HashMap<Long, Double> = HashMap<Long, Double>(),

    @ElementCollection
    open val forWhom: HashMap<Long, Double> = HashMap<Long, Double>(),

    @ManyToOne
    @JoinColumn(name = "transactions")
    open val groupEntity: GroupEntity = GroupEntity()
) {

    data class Builder(
        var id: Long = 0,
        var purpose: String = "",
        var date: LocalDateTime = LocalDateTime.now(),
        var currency: Currency = Currency.HUF,
        var type: TransactionType? = TransactionType.EXPENSE,
        var who: HashMap<Long, Double> = HashMap<Long, Double>(),
        var forWhom: HashMap<Long, Double> = HashMap<Long, Double>(),
        var groupEntity: GroupEntity = GroupEntity()
    ) {
        fun id(id: Long) = apply { this.id = id }
        fun purpose(purpose: String) = apply { this.purpose = purpose }
        fun date(date: LocalDateTime) = apply { this.date = date }
        fun currency(currency: Currency) = apply { this.currency = currency }
        fun type(type: TransactionType?) = apply { this.type = type }
        fun who(who: HashMap<Long, Double>) = apply { this.who = who }
        fun forWhom(forWhom: HashMap<Long, Double>) = apply { this.forWhom = forWhom }
        fun groupEntity(groupEntity: GroupEntity) = apply { this.groupEntity = groupEntity }
        fun build() = Transaction(id, purpose, date, currency, type, who, forWhom, groupEntity)
    }
}