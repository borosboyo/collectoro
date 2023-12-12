package hu.bme.aut.collectoro.repository

import hu.bme.aut.collectoro.RepositoryTestConfig
import hu.bme.aut.collectoro.shared.provider.Provider
import hu.bme.aut.collectoro.core.user.UserEntity
import hu.bme.aut.collectoro.core.user.UserRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.context.annotation.Import
import java.util.*

@DataJpaTest
@Import(value = [RepositoryTestConfig::class])
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {
    @Autowired
    private lateinit var userRepository: UserRepository

    @Test
    fun testFindByEmail() {
        // Create a user entity and save it in the repository
        val user = UserEntity(
            email = "test@example.com"
        )
        userRepository.save(user)

        // Find the user by email
        val foundUser = userRepository.findByEmail("test@example.com").get()

        // Assert that the found user is not null and has the correct email
        Assertions.assertNotNull(foundUser)
        Assertions.assertEquals("test@example.com", foundUser.getEmail())
    }

    @Test
    fun testFindByEmailAndProvider() {
        // Create a user entity and save it in the repository
        val user = UserEntity(
            email = "test@example.com",
            provider = Provider.GOOGLE
        )
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

    @Test
    fun testFindByIdIn() {
        // Create a list of UserEntity objects and save them in the repository
        val user1 = UserEntity(email = "test1@example.com")
        val user2 = UserEntity(email = "test2@example.com")
        val user3 = UserEntity(email = "test3@example.com")
        val savedUser1 = userRepository.save(user1)
        val savedUser2 = userRepository.save(user2)
        val savedUser3 = userRepository.save(user3)

        // Create a list of IDs from the saved UserEntity objects
        val ids = listOf(savedUser1.id, savedUser2.id, savedUser3.id)

        // Call the findByIdIn method with the list of IDs
        val foundUsers = userRepository.findByIdIn(ids)

        // Assert that the returned list of UserEntity objects is not empty and contains the expected UserEntity objects
        Assertions.assertFalse(foundUsers.isEmpty())
        Assertions.assertTrue(foundUsers.containsAll(listOf(savedUser1, savedUser2, savedUser3)))
    }

    @Test
    fun testDeleteByEmail() {
        // Create a UserEntity object and save it in the repository
        val user = UserEntity(email = "test@example.com")
        userRepository.save(user)

        // Call the deleteByEmail method with the email of the saved UserEntity
        userRepository.deleteByEmail("test@example.com")

        // Call the findByEmail method with the same email to verify that the user has been deleted
        val foundUser: Optional<UserEntity> = userRepository.findByEmail("test@example.com")


        // Assert that the returned UserEntity is null, indicating that the user has been successfully deleted
        Assertions.assertFalse(foundUser.isPresent)
    }
}
