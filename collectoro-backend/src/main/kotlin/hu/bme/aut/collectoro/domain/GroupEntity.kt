package hu.bme.aut.collectoro.domain

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import hu.bme.aut.collectoro.domain.transaction.Currency
import hu.bme.aut.collectoro.domain.transaction.Transaction
import jakarta.persistence.*
import org.jetbrains.annotations.NotNull
import org.springframework.context.annotation.Lazy
import java.util.*

@Entity
@Table(name = "group_entity")
class GroupEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String? = null,

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_entities")
    @JsonManagedReference
    val users: MutableList<UserEntity> = ArrayList(),

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_entities")
    @JsonManagedReference
    val transactions: MutableList<Transaction> = ArrayList(),

    val joinLink: String? = UUID.randomUUID().toString(),

    val currency: Currency = Currency.HUF,

    ) {
    data class Builder(
        var id: Long = 0,
        var name: String? = null,
        var users: MutableList<UserEntity> = ArrayList(),
        var transactions: MutableList<Transaction> = ArrayList(),
        var joinLink: String? = UUID.randomUUID().toString(),
        var currency: Currency = Currency.HUF,
    ) {
        fun id(id: Long) = apply { this.id = id }
        fun name(name: String?) = apply { this.name = name }
        fun users(users: MutableList<UserEntity>) = apply { this.users = users }
        fun transactions(transactions: MutableList<Transaction>) = apply { this.transactions = transactions }
        fun joinLink(joinLink: String?) = apply { this.joinLink = joinLink }
        fun currency(currency: Currency) = apply { this.currency = currency }
        fun build() = GroupEntity(id, name, users, transactions, joinLink, currency)
    }
}