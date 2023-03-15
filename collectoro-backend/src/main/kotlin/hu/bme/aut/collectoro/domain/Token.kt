package hu.bme.aut.collectoro.domain

import jakarta.persistence.*

@Entity
@Table(name = "token")
class Token private constructor(
    @Id
    @GeneratedValue
    var id: Long? = null,

    @Column(unique = true)
    var token: String? = null,

    @Enumerated(EnumType.STRING)
    var tokenType: TokenType = TokenType.BEARER,

    var revoked: Boolean = false,

    var expired: Boolean = false,

    @ManyToOne
    @JoinColumn(name = "user_entity_id")
    var userEntity: UserEntity? = null
) {
    constructor() : this(null, null, TokenType.BEARER, false, false, null) {

    }

    data class Builder(
        var id: Long? = null,
        var token: String? = null,
        var tokenType: TokenType = TokenType.BEARER,
        var revoked: Boolean = false,
        var expired: Boolean = false,
        var userEntity: UserEntity? = null
    ) {
        fun id(id: Long?) = apply { this.id = id }
        fun token(token: String?) = apply { this.token = token }
        fun tokenType(tokenType: TokenType) = apply { this.tokenType = tokenType }
        fun revoked(revoked: Boolean) = apply { this.revoked = revoked }
        fun expired(expired: Boolean) = apply { this.expired = expired }
        fun user(userEntity: UserEntity?) = apply { this.userEntity = userEntity }
        fun build() = Token(id, token, tokenType, revoked, expired, userEntity)
    }

}