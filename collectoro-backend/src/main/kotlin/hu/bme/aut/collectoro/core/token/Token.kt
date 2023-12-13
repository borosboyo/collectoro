package hu.bme.aut.collectoro.core.token

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import hu.bme.aut.collectoro.core.token.util.TokenType
import hu.bme.aut.collectoro.core.user.UserEntity
import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.io.Serializable
import java.util.*

@Entity
@Table(name = "token")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
data class Token(
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
    @JsonBackReference(value = "tokenUserEntity")
    var userEntity: UserEntity? = null

) : Serializable

@Repository
interface TokenRepository : JpaRepository<Token, Long> {

    @Query(
        value = "SELECT * FROM token WHERE user_entity_id = ?1 AND revoked = false AND expired = false",
        nativeQuery = true
    )
    fun findAllNotExpiredOrRevokedTokenByUserEntityAnAndTokenType(id: Long?, tokenType: TokenType): List<Token?>?

    fun findTokenByToken(token: String?): Optional<Token>
}