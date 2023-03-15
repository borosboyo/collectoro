package hu.bme.aut.collectoro.domain

import jakarta.persistence.*
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails


@Entity
@Table(name = "user_entity")
class UserEntity private constructor(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val firstName: String? = null,
    val lastName: String? = null,
    private val email: String? = null,
    private val password: String? = null,

    @Enumerated(EnumType.STRING)
    val role: Role = Role.USER,

    @OneToMany
    @JoinColumn(name = "user_entity")
    val tokens: List<Token> = ArrayList()
) : UserDetails {

    constructor() : this(0, null, null, null, null, Role.USER, ArrayList()) {
    }

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf(SimpleGrantedAuthority(role.name))
    }

    override fun getPassword(): String {
        return password!!
    }

    override fun getUsername(): String {
        return email!!
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
        var firstName: String? = null,
        var lastName: String? = null,
        var email: String? = null,
        var password: String? = null,
        var role: Role = Role.USER,
        var tokens: List<Token> = ArrayList()
    ) {
        fun id(id: Long) = apply { this.id = id }
        fun firstName(firstName: String) = apply { this.firstName = firstName }
        fun lastName(lastName: String) = apply { this.lastName = lastName }
        fun email(email: String) = apply { this.email = email }
        fun password(password: String) = apply { this.password = password }
        fun role(role: Role) = apply { this.role = role }
        fun tokens(tokens: List<Token>) = apply { this.tokens = tokens }
        fun build() = UserEntity(id, firstName, lastName, email, password, role, tokens)
    }

}