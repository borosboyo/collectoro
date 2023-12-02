package hu.bme.aut.collectoro.core.transaction

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import hu.bme.aut.collectoro.core.group.GroupEntity
import hu.bme.aut.collectoro.core.transaction.util.Currency
import hu.bme.aut.collectoro.core.transaction.util.TransactionType
import hu.bme.aut.collectoro.core.transaction.util.UserWithAmount
import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.io.Serializable
import java.time.LocalDateTime

@Entity
data class Transaction(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,
    var purpose: String = "",
    var date: LocalDateTime = LocalDateTime.now(),
    var currency: Currency = Currency.HUF,
    var type: TransactionType? = TransactionType.EXPENSE,

    @OneToMany(mappedBy = "transaction", cascade = [CascadeType.ALL])
    var who: MutableList<UserWithAmount> = ArrayList<UserWithAmount>(),

    @OneToMany(mappedBy = "transaction", cascade = [CascadeType.ALL])
    var forWhom: MutableList<UserWithAmount> = ArrayList<UserWithAmount>(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(
        name = "group_transaction",
        joinColumns = [JoinColumn(name = "transaction_id")]
    )
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
    var groupEntity: GroupEntity = GroupEntity()
) : Serializable {
    override fun toString(): String {
        return "Transaction(id=$id, purpose='$purpose', date=$date, currency=$currency, type=$type, who=$who, forWhom=$forWhom, groupEntity=$groupEntity)"
    }
}

@Repository
interface TransactionRepository : JpaRepository<Transaction, Long>