package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.domain.Token
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TokenRepository : JpaRepository<Token, Long>
{

    @Query(value = "SELECT * FROM token WHERE user_entity_id = ?1 AND revoked = false AND expired = false", nativeQuery = true)
    fun findAllNotExpiredOrRevokedTokenByUserEntity(id: Long?): List<Token?>?

    fun findByToken(token: String?): Optional<Token?>?
}