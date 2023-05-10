package hu.bme.aut.collectoro.domain

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import hu.bme.aut.collectoro.domain.transaction.Currency
import jakarta.persistence.*

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
class Balance(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val groupId: Long = 0,
    val currency: Currency = Currency.HUF,
    var amount: Double,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "balances")
    @JsonManagedReference
    val wallet: Wallet? = null
) {
    data class Builder(
        var id: Long = 0,
        var groupId: Long = 0,
        var currency: Currency = Currency.HUF,
        var amount: Double = 0.0,
        var wallet: Wallet? = null
    ) {
        fun id(id: Long) = apply { this.id = id }
        fun groupId(groupId: Long) = apply { this.groupId = groupId }
        fun currency(currency: Currency) = apply { this.currency = currency }
        fun amount(amount: Double) = apply { this.amount = amount }
        fun wallet(wallet: Wallet?) = apply { this.wallet = wallet }
        fun build() = Balance(id, groupId, currency, amount, wallet)
    }
}