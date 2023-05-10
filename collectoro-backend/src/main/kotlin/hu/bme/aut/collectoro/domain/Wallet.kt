package hu.bme.aut.collectoro.domain

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import jakarta.persistence.*

//Integrate
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
class Wallet(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @OneToMany
    @JoinColumn(name = "wallet")
    @JsonManagedReference
    val balances: MutableList<Balance> = ArrayList(),

    @OneToOne
    @JoinColumn(name = "wallet")
    @JsonManagedReference
    var userEntity: UserEntity? = null
)