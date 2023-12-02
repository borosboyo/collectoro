package hu.bme.aut.collectoro.core.transaction.util

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.ObjectIdGenerators
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

    @OneToMany(mappedBy = "wallet")
    var balances: MutableList<Balance> = ArrayList(),

    @OneToOne
    @JoinColumn(name = "wallet")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
    var userEntity: UserEntity? = null
) : Serializable

@Repository
interface WalletRepository : JpaRepository<Wallet, Long>