package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.RepositoryTestConfig
import hu.bme.aut.collectoro.domain.Provider
import hu.bme.aut.collectoro.domain.UserEntity
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.context.annotation.Import

@DataJpaTest
@Import(value = [RepositoryTestConfig::class])
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {
    @Autowired
    private lateinit var userRepository: UserRepository

    @Test
    fun testFindByEmail() {
        // Create a user entity and save it in the repository
        val user = UserEntity.Builder()
            .email("test@example.com")
            .build()
        userRepository.save(user)

        // Find the user by email
        val foundUser = userRepository.findByEmail("test@example.com")

        // Assert that the found user is not null and has the correct email
        Assertions.assertNotNull(foundUser)
        Assertions.assertEquals("test@example.com", foundUser?.getEmail())
    }

    @Test
    fun testFindByEmailAndProvider() {
        // Create a user entity and save it in the repository
        val user = UserEntity.Builder()
            .email("test@example.com")
            .provider(Provider.GOOGLE)
            .build()
        userRepository.save(user)

        // Find the user by email and provider
        val foundUser = userRepository.findByEmailAndProvider("test@example.com", Provider.GOOGLE)

        // Assert that the found user is not null, has the correct email, and has the correct provider
        Assertions.assertNotNull(foundUser)
        if (foundUser != null) {
            Assertions.assertEquals("test@example.com", foundUser.getEmail())
        }
        if (foundUser != null) {
            Assertions.assertEquals(Provider.GOOGLE, foundUser.provider)
        }
    }
}
