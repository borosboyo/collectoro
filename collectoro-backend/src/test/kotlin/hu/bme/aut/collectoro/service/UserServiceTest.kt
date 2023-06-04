package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.domain.Provider
import hu.bme.aut.collectoro.domain.UserEntity
import hu.bme.aut.collectoro.dto.user.*
import hu.bme.aut.collectoro.repository.GroupRepository
import hu.bme.aut.collectoro.repository.UserRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
@Transactional
class UserServiceTest {
    @Autowired
    private lateinit var userService: UserService

    @MockBean
    private lateinit var userRepository: UserRepository

    @MockBean
    private lateinit var groupRepository: GroupRepository

    @Test
    fun testGetUserById() {
        // Create a test GetUserByIdReq
        val req = GetUserByIdReq()
        req.id = 1L

        // Create a mock UserEntity and set up the mock UserRepository behavior
        val user = UserEntity.Builder()
            .id(req.id!!)
            .firstName("John")
            .lastName("Doe")
            .build()
        `when`(userRepository.findById(req.id!!)).thenReturn(java.util.Optional.of(user))

        // Call the service method
        val resp = userService.getUserById(req)

        // Assert that the response contains the expected UserEntity
        Assertions.assertEquals(user, resp.user)
    }

    @Test
    fun testProcessOAuthPostLogin() {
        // Create a test email
        val email = "john.doe@example.com"

        //// Verify that userRepository.save was called with the expected UserEntity
        //val expectedUser = UserEntity.Builder()
        //    .firstName(email)
        //    .provider(Provider.GOOGLE)
        //    .build()
        //
        //// Set up the mock UserRepository behavior to return null for findByEmail
        //`when`(userRepository.findByEmail(email)).thenReturn(null)
        //`when`(userRepository.save(expectedUser)).thenReturn(expectedUser)


        // Call the service method
        userService.processOAuthPostLogin(email)

        Mockito.verify(userRepository).save(Mockito.any(UserEntity::class.java))
    }

    @Test
    fun testDeleteUserById() {
        // Create a test DeleteUserByIdReq
        val req = DeleteUserByIdReq()
        req.userId = 1L

        // Call the service method
        val resp = userService.deleteUserById(req)

        // Verify that userRepository.deleteById was called with the expected user ID
        Mockito.verify(userRepository).deleteById(req.userId)

        // Assert that the response is of type DeleteUserByIdResp
        Assertions.assertEquals(DeleteUserByIdResp::class.java, resp.javaClass)
    }

    @Test
    fun testGetUsersByGroupId() {
        // Create a test GetUsersByGroupIdReq
        val req = GetUsersByGroupIdReq(groupId = 1L)

        // Call the service method
        val resp = userService.getUsersByGroupId(req)

        // Assert that the response is of type GetUsersByGroupIdResp
        Assertions.assertEquals(GetUsersByGroupIdResp::class.java, resp.javaClass)
    }

    @Test
    fun testGetHomepageByUserEmail() {
        // Create a test GetHomepageByUserEmailReq
        val req = GetHomepageByUserEmailReq(email = "john.doe@example.com")

        // Create a mock UserEntity and set up the mock UserRepository behavior
        val user = UserEntity.Builder()
            .email(req.email!!)
            .build()
        `when`(userRepository.findByEmail(req.email!!)).thenReturn(user)

        // Set up the mock GroupRepository behavior
        `when`(groupRepository.findGroupEntitiesByUser(user)).thenReturn(emptyList())

        // Call the service method
        val resp = userService.getHomepageByUserEmail(req)

        // Assert that the response contains the expected UserEntity and empty groups list
        Assertions.assertEquals(user, resp.user)
        Assertions.assertTrue(resp.groups.isEmpty())
    }

    @Test
    fun testGetProfileByUserEmail() {
        // Create a test GetProfileByUserEmailReq
        val req = GetProfileByUserEmailReq()
        req.email = "john.doe@example.com"

        // Create a mock UserEntity and set up the mock UserRepository behavior
        val user = UserEntity.Builder()
            .email(req.email!!)
            .build()
        `when`(userRepository.findByEmail(req.email!!)).thenReturn(user)

        // Call the service method
        val resp = userService.getProfileByUserEmail(req)

        // Assert that the response contains the expected UserEntity
        Assertions.assertEquals(user, resp.user)
    }
}
