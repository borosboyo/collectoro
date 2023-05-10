package hu.bme.aut.collectoro.domain

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import jakarta.persistence.*
import org.hibernate.annotations.Fetch
import org.springframework.context.annotation.Lazy
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails


@Entity
@Table(name = "user_entity")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
class UserEntity private constructor(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val provider: Provider? = Provider.LOCAL,
    val firstName: String? = null,
    val lastName: String? = null,
    private var email: String? = null,
    private var password: String? = null,

    @Enumerated(EnumType.STRING)
    val role: Role = Role.USER,

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_entity")
    @JsonManagedReference
    val tokens: MutableList<Token> = ArrayList(),

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "users")
    @JsonManagedReference
    val groupEntities: MutableList<GroupEntity> = ArrayList(),

    var enabled: Boolean? = false,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_entity")
    @JsonManagedReference
    var wallet: Wallet? = null

    ) : UserDetails {

    constructor() : this(0, Provider.LOCAL,null, null, null, null, Role.USER, ArrayList(),  ArrayList())

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf(SimpleGrantedAuthority(role.name))
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
        return true;
    }

    override fun isEnabled(): Boolean {
        return true;
    }

    data class Builder(
        var id: Long = 0,
        var provider: Provider = Provider.LOCAL,
        var firstName: String? = null,
        var lastName: String? = null,
        var email: String? = null,
        var password: String? = null,
        var role: Role = Role.USER,
        var tokens: MutableList<Token> = ArrayList(),
        var groupEntities: MutableList<GroupEntity> = ArrayList(),
        var enabled: Boolean? = false,
        var wallet: Wallet? = null
    ) {
        fun id(id: Long) = apply { this.id = id }
        fun provider(provider: Provider) = apply { this.provider = provider }
        fun firstName(firstName: String) = apply { this.firstName = firstName }
        fun lastName(lastName: String) = apply { this.lastName = lastName }
        fun email(email: String) = apply { this.email = email }
        fun password(password: String) = apply { this.password = password }
        fun role(role: Role) = apply { this.role = role }
        fun tokens(tokens: MutableList<Token>) = apply { this.tokens = tokens }
        fun groups(groupEntities: MutableList<GroupEntity>) = apply { this.groupEntities = groupEntities }
        fun enabled(enabled: Boolean) = apply { this.enabled = enabled }
        fun wallet(wallet: Wallet) = apply { this.wallet = wallet }
        fun build() = UserEntity(id, provider, firstName, lastName, email, password, role, tokens, groupEntities, enabled, wallet)
    }

}