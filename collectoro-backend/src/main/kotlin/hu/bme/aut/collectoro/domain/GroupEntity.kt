package hu.bme.aut.collectoro.domain

import hu.bme.aut.collectoro.domain.transaction.Transaction
import jakarta.persistence.*

@Entity
@Table(name = "group_entity")
class GroupEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String? = null,

    @ManyToMany
    @JoinColumn(name = "group_entities")
    val users: List<UserEntity> = ArrayList(),

    @OneToMany
    @JoinColumn(name = "group_entities")
    val transactions: List<Transaction> = ArrayList()

) {
    data class Builder(
        var id: Long = 0,
        var name: String? = null,
        var users: List<UserEntity> = ArrayList(),
        var transactions: List<Transaction> = ArrayList()
    ) {
        fun id(id: Long) = apply { this.id = id }
        fun name(name: String?) = apply { this.name = name }
        fun users(users: List<UserEntity>) = apply { this.users = users }
        fun transactions(transactions: List<Transaction>) = apply { this.transactions = transactions }
        fun build() = GroupEntity(id, name, users, transactions)
    }
}