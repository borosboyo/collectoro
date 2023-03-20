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
}