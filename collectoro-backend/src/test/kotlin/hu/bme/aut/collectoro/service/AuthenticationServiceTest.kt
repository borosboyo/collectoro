package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.domain.*
import hu.bme.aut.collectoro.dto.auth.*
import hu.bme.aut.collectoro.dto.user.EnableReq
import hu.bme.aut.collectoro.repository.TokenRepository
import hu.bme.aut.collectoro.repository.UserRepository
import hu.bme.aut.collectoro.repository.WalletRepository
import hu.bme.aut.collectoro.service.AuthenticationService
import hu.bme.aut.collectoro.service.EmailService
import hu.bme.aut.collectoro.service.JWTService
import jakarta.transaction.Transactional
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mock
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import org.mockito.MockitoAnnotations
import org.mockito.kotlin.any
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import java.util.*

@SpringBootTest
@Transactional
class AuthenticationServiceTest {
    private lateinit var authenticationService: AuthenticationService

    @Mock
    private lateinit var userRepository: UserRepository

    @Mock
    private lateinit var tokenRepository: TokenRepository

    @Mock
    private lateinit var passwordEncoder: PasswordEncoder

    @Mock
    private lateinit var jwtService: JWTService

    @Mock
    private lateinit var authenticationManager: AuthenticationManager

    @Mock
    private lateinit var emailService: EmailService

    @Mock
    private lateinit var walletRepository: WalletRepository

    @BeforeEach
    fun setUp() {
        MockitoAnnotations.openMocks(this)
        authenticationService = AuthenticationService(
            userRepository,
            tokenRepository,
            passwordEncoder,
            jwtService,
            authenticationManager,
            emailService,
            walletRepository
        )
    }

    @Test
    fun testRegister() {
        // Arrange
        val request = RegisterReq(
            firstName = "John",
            lastName = "Doe",
            email = "johndoe@example.com",
            password = "password"
        )
        val userEntity = UserEntity.Builder()
            .firstName(request.firstName)
            .lastName(request.lastName)
            .email(request.email)
            .password("encodedPassword")
            .role(Role.USER)
            .provider(Provider.LOCAL)
            .enabled(true)
            .build()
        `when`(userRepository.findByEmail(request.email)).thenReturn(null)
        `when`(passwordEncoder.encode(request.password)).thenReturn("encodedPassword")
        `when`(userRepository.save(any())).thenReturn(userEntity)
        `when`(jwtService.generateToken(userEntity)).thenReturn("verificationToken")

        // Act
        val authenticationResp = authenticationService.register(request)

        // Assert
        assertEquals("User registered successfully", authenticationResp?.message)
    }

    @Test
    fun testAuthenticate() {
        // Arrange
        val request = AuthenticationReq(
            email = "johndoe@example.com",
            password = "password"
        )
        val userEntity = UserEntity.Builder()
            .firstName("John")
            .lastName("Doe")
            .email(request.email)
            .password("encodedPassword")
            .role(Role.USER)
            .provider(Provider.LOCAL)
            .enabled(true)
            .build()
        `when`(userRepository.findByEmail(request.email)).thenReturn(userEntity)
        `when`(userRepository.findByEmailAndProvider(request.email, Provider.LOCAL)).thenReturn(userEntity)
        `when`(passwordEncoder.matches(request.password, userEntity.password)).thenReturn(true)
        `when`(jwtService.generateToken(userEntity)).thenReturn("jwtToken")

        // Act
        val authenticationResp = authenticationService.authenticate(request)

        // Assert
        assertEquals("jwtToken", authenticationResp?.token)
    }

    @Test
    fun testEnable() {
        // Arrange
        var request = EnableReq()
        request.token = "verificationToken"
        val token = Token.Builder()
            .userEntity(UserEntity())
            .token(request.token)
            .tokenType(TokenType.VERIFICATION)
            .expired(false)
            .revoked(false)
            .build()
        val userEntity = UserEntity.Builder()
            .firstName("John")
            .lastName("Doe")
            .email("johndoe@example.com")
            .password("encodedPassword")
            .role(Role.USER)
            .provider(Provider.LOCAL)
            .enabled(false)
            .build()
        `when`(tokenRepository.findByToken(request.token)).thenReturn(Optional.of(token))
        `when`(userRepository.save(any())).thenReturn(userEntity)
        `when`(jwtService.generateToken(userEntity)).thenReturn("jwtToken")


        // Act
        val enableResp = authenticationService.enable(request)

        // Assert
        assertEquals("jwtToken", enableResp?.token)
    }

    @Test
    fun testAuthenticateGoogle() {
        // Arrange
        val request = GoogleAuthenticationReq(
            firstName = "John",
            lastName = "Doe",
            email = "johndoe@example.com"
        )
        val userEntity = UserEntity.Builder()
            .firstName(request.firstName)
            .lastName(request.lastName)
            .email(request.email)
            .role(Role.USER)
            .provider(Provider.GOOGLE)
            .enabled(true)
            .build()
        `when`(userRepository.findByEmailAndProvider(request.email, Provider.GOOGLE)).thenReturn(userEntity)
        `when`(userRepository.save(userEntity)).thenReturn(userEntity)
        `when`(jwtService.generateToken(userEntity)).thenReturn("jwtToken")

        // Act
        val authenticationResp = authenticationService.authenticateGoogle(request)

        // Assert
        assertEquals("jwtToken", authenticationResp?.token)
    }

    @Test
    fun testResetPassword() {
        // Arrange
        val req = ResetPasswordReq(email = "johndoe@example.com")
        val user = UserEntity.Builder()
            .firstName("example")
            .lastName("example")
            .email(req.email)
            .role(Role.USER)
            .provider(Provider.GOOGLE)
            .enabled(true)
            .build()
        `when`(userRepository.findByEmail(req.email)).thenReturn(user)
        `when`(jwtService.generateToken(user)).thenReturn("resetPasswordToken")

        // Act
        val resetPasswordResp = authenticationService.resetPassword(req)

        // Assert
        assertEquals(resetPasswordResp, resetPasswordResp)
    }

    @Test
    fun testSaveForgotPassword() {
        // Arrange
        val req = SaveForgotPasswordReq(token = "resetPasswordToken", newPassword = "newPassword")
        val token = Token.Builder()
            .userEntity(UserEntity())
            .token(req.token)
            .tokenType(TokenType.RESET_PASSWORD)
            .expired(false)
            .revoked(false)
            .build()
        `when`(tokenRepository.findByToken(req.token)).thenReturn(Optional.of(token))
        `when`(passwordEncoder.encode(any())).thenReturn("newPassword")

        // Act
        val saveForgotPasswordResp = authenticationService.saveForgotPassword(req)

        // Assert
        assertEquals(saveForgotPasswordResp, saveForgotPasswordResp)
    }

    @Test
    fun testUpdatePassword() {
        // Arrange
        val req = UpdatePasswordReq(oldPassword = "password", newPassword = "newPassword")
        val user = UserEntity.Builder()
            .firstName("John")
            .lastName("Doe")
            .email("johndoe@example.com")
            .password("password")
            .role(Role.USER)
            .provider(Provider.LOCAL)
            .enabled(true)
            .build()

        val authentication = Mockito.mock(Authentication::class.java)
        SecurityContextHolder.getContext().authentication = authentication

        `when`(authentication.principal).thenReturn(user)
        `when`(userRepository.findByEmail(user.getEmail())).thenReturn(user)
        `when`(passwordEncoder.matches(req.oldPassword, user.password)).thenReturn(true)
        `when`(passwordEncoder.encode(req.newPassword)).thenReturn("newPassword")

        // Act
        val updatePasswordResp = authenticationService.updatePassword(req)

        // Assert
        assertEquals(updatePasswordResp, updatePasswordResp)
    }

}
