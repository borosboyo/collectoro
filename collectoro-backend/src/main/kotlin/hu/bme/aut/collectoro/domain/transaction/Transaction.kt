package hu.bme.aut.collectoro.domain.transaction

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.ObjectIdGenerators
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

    @OneToMany(mappedBy = "transaction", cascade = [CascadeType.ALL])
    open var who: MutableList<UserWithAmount> = ArrayList<UserWithAmount>(),

    @OneToMany(mappedBy = "transaction", cascade = [CascadeType.ALL])
    open var forWhom: MutableList<UserWithAmount> = ArrayList<UserWithAmount>(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(name = "group_transaction",
        joinColumns = [JoinColumn(name = "transaction_id")]
    )
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
    open val groupEntity: GroupEntity = GroupEntity()
) {

    data class Builder(
        var id: Long = 0,
        var purpose: String = "",
        var date: LocalDateTime = LocalDateTime.now(),
        var currency: Currency = Currency.HUF,
        var type: TransactionType? = TransactionType.EXPENSE,
        var who: MutableList<UserWithAmount>  = ArrayList<UserWithAmount>(),
        var forWhom: MutableList<UserWithAmount>  = ArrayList<UserWithAmount>(),
        var groupEntity: GroupEntity = GroupEntity()
    ) {
        fun id(id: Long) = apply { this.id = id }
        fun purpose(purpose: String) = apply { this.purpose = purpose }
        fun date(date: LocalDateTime) = apply { this.date = date }
        fun currency(currency: Currency) = apply { this.currency = currency }
        fun type(type: TransactionType?) = apply { this.type = type }
        fun who(who: MutableList<UserWithAmount>) = apply { this.who = who }
        fun forWhom(forWhom: MutableList<UserWithAmount>) = apply { this.forWhom = forWhom }
        fun groupEntity(groupEntity: GroupEntity) = apply { this.groupEntity = groupEntity }
        fun build() = Transaction(id, purpose, date, currency, type, who, forWhom, groupEntity)
    }

    override fun toString(): String {
        return "Transaction(id=$id, purpose='$purpose', date=$date, currency=$currency, type=$type, who=$who, forWhom=$forWhom, groupEntity=$groupEntity)"
    }
}