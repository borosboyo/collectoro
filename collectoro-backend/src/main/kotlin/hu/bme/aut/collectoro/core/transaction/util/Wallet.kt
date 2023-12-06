package hu.bme.aut.collectoro.core.transaction.util

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonManagedReference
import hu.bme.aut.collectoro.core.user.UserEntity
import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.io.Serializable

@Entity
data class Wallet(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JsonManagedReference
    var balances: MutableList<Balance> = ArrayList(),

    @OneToOne
    @JsonBackReference
    var userEntity: UserEntity? = null

) : Serializable

@Repository
interface WalletRepository : JpaRepository<Wallet, Long>