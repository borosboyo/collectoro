package hu.bme.aut.collectoro.core.transaction.util

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonManagedReference
import hu.bme.aut.collectoro.core.user.UserEntity
import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.io.Serializable

@Entity
class Wallet(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JsonManagedReference(value = "walletBalances")
    var balances: MutableList<Balance> = ArrayList(),

    @OneToOne
    @JsonBackReference(value = "walletUserEntity")
    var userEntity: UserEntity? = null

) : Serializable {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Wallet

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }
}

@Repository
interface WalletRepository : JpaRepository<Wallet, Long>