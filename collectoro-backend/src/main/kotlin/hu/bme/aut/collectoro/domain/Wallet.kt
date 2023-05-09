package hu.bme.aut.collectoro.domain

import jakarta.persistence.*

//Integrate
@Entity
class Wallet(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @OneToMany
    @JoinColumn(name = "wallet")
    val balances: MutableList<Balance> = ArrayList(),

    @OneToOne
    @JoinColumn(name = "wallet")
    val userEntity: UserEntity? = null
)