package hu.bme.aut.collectoro.core.transaction

import com.fasterxml.jackson.annotation.*
import hu.bme.aut.collectoro.core.group.GroupEntity
import hu.bme.aut.collectoro.core.transaction.util.Currency
import hu.bme.aut.collectoro.core.transaction.util.TransactionType
import hu.bme.aut.collectoro.core.transaction.util.UserWithAmount
import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.io.Serializable
import java.time.LocalDate

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
data class Transaction(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,
    var purpose: String = "",

    @JsonFormat(pattern = "yyyy-MM-dd")
    var date: LocalDate = LocalDate.now(),

    @Enumerated(EnumType.STRING)
    var currency: Currency = Currency.HUF,

    @Enumerated(EnumType.STRING)
    var type: TransactionType? = TransactionType.EXPENSE,

    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JsonManagedReference(value="transactionWho")
    var who: MutableList<UserWithAmount> = ArrayList<UserWithAmount>(),

    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JsonManagedReference(value="transactionForWhom")
    var forWhom: MutableList<UserWithAmount> = ArrayList<UserWithAmount>(),

    @ManyToOne
    @JsonBackReference(value="transactionGroupEntity")
    var groupEntity: GroupEntity = GroupEntity()

) : Serializable {
    override fun toString(): String {
        return "Transaction(id=$id, purpose='$purpose', date=$date, currency=$currency, type=$type, who=$who, forWhom=$forWhom, groupEntity=$groupEntity)"
    }
}

@Repository
interface TransactionRepository : JpaRepository<Transaction, Long>