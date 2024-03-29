package hu.bme.aut.collectoro.core.user

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonManagedReference
import hu.bme.aut.collectoro.core.group.GroupEntity
import hu.bme.aut.collectoro.core.role.GroupRole
import hu.bme.aut.collectoro.core.role.UserRole
import hu.bme.aut.collectoro.core.token.Token
import hu.bme.aut.collectoro.core.transaction.util.Wallet
import hu.bme.aut.collectoro.core.user.image.Image
import hu.bme.aut.collectoro.shared.provider.Provider
import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Repository
import java.util.*
import kotlin.collections.ArrayList


@Entity
@Table(name = "user_entity")
data class UserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Enumerated(EnumType.STRING)
    var provider: Provider? = Provider.LOCAL,

    var firstName: String? = null,
    var lastName: String? = null,
    private var email: String? = null,
    private var password: String? = null,

    @Enumerated(EnumType.STRING)
    val userRole: UserRole = UserRole.USER,

    @OneToMany(cascade = [CascadeType.REMOVE], fetch = FetchType.EAGER)
    @JsonManagedReference(value = "userTokens")
    val tokens: MutableList<Token> = ArrayList(),

    @ManyToMany
    @JsonBackReference(value = "userGroups")
    val groups: MutableList<GroupEntity> = ArrayList(),

    var enabled: Boolean? = false,

    @OneToOne(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JsonManagedReference(value = "userWallet")
    var wallet: Wallet? = null,

    @OneToOne(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JsonManagedReference(value = "userImage")
    var image: Image? = null

) : UserDetails {

    constructor() : this(0, Provider.LOCAL, null, null, null, null, UserRole.USER, ArrayList(), ArrayList())

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf(SimpleGrantedAuthority(userRole.name))
    }

    override fun getPassword(): String {
        return password!!
    }

    override fun getUsername(): String {
        return email!!
    }

    fun getEmail(): String {
        return email!!
    }

    fun setPassword(password: String) {
        this.password = password
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }
}

@Repository
interface UserRepository : JpaRepository<UserEntity, Long> {
    fun findByEmail(email: String): Optional<UserEntity>
    fun findByEmailAndProvider(email: String, provider: Provider): UserEntity?

    //find users list based on array of ids
    fun findByIdIn(ids: List<Long>): List<UserEntity>

    fun deleteByEmail(email: String)
}