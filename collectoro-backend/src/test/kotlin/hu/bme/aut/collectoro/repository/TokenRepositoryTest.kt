package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.RepositoryTestConfig
import hu.bme.aut.collectoro.core.token.Token
import hu.bme.aut.collectoro.core.token.TokenRepository
import hu.bme.aut.collectoro.core.token.util.TokenType
import hu.bme.aut.collectoro.core.user.UserEntity
import hu.bme.aut.collectoro.core.user.UserRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.context.annotation.Import
import java.time.LocalDateTime

@DataJpaTest
@Import(value = [RepositoryTestConfig::class])
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class TokenRepositoryTest {
    @Autowired
    private lateinit var tokenRepository: TokenRepository

    @Autowired
    private lateinit var userRepository: UserRepository

    @Test
    fun testFindAllNotExpiredOrRevokedTokenByUserEntityAnAndTokenType() {
        // Create a UserEntity and save it to the repository
        val userEntity = UserEntity()
        val savedUserEntity = userRepository.save(userEntity)

        // Create a Token and associate it with the UserEntity
        val token = Token(
            token = "token123",
            tokenType = TokenType.BEARER,
            userEntity = savedUserEntity,
        )
        tokenRepository.save(token)

        // Call the repository method to find tokens
        val foundTokens = tokenRepository.findAllNotExpiredOrRevokedTokenByUserEntityAnAndTokenType(savedUserEntity.id, TokenType.BEARER)

        // Assert that the found tokens list is not empty and contains the expected token
        Assertions.assertFalse(foundTokens.isNullOrEmpty())
        Assertions.assertTrue(foundTokens!!.contains(token))
    }

    @Test
    fun testFindTokenByToken() {
        // Create a UserEntity and save it to the repository
        val userEntity = UserEntity()
        val savedUserEntity = userRepository.save(userEntity)

        // Create a Token and associate it with the saved UserEntity
        val token = Token(
            token = "token123",
            tokenType = TokenType.BEARER,
            userEntity = savedUserEntity,
        )
        tokenRepository.save(token)

        // Call the repository method to find the token by token string
        val foundToken = tokenRepository.findTokenByToken("token123")

        // Assert that the found token is present and matches the expected token
        foundToken.let { Assertions.assertTrue(it.isPresent) }
        Assertions.assertEquals(token, foundToken.get())
    }
}