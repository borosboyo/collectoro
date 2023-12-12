package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.core.auth.AuthenticationService
import hu.bme.aut.collectoro.core.auth.JWTService
import hu.bme.aut.collectoro.core.auth.dto.*
import hu.bme.aut.collectoro.core.user.dto.EnableReq
import hu.bme.aut.collectoro.core.mail.EmailService
import hu.bme.aut.collectoro.core.role.UserRole
import hu.bme.aut.collectoro.core.token.Token
import hu.bme.aut.collectoro.core.token.TokenRepository
import hu.bme.aut.collectoro.core.token.util.TokenType
import hu.bme.aut.collectoro.core.transaction.util.WalletRepository
import hu.bme.aut.collectoro.core.user.UserEntity
import hu.bme.aut.collectoro.core.user.UserRepository
import hu.bme.aut.collectoro.shared.provider.Provider
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
        val userEntity = UserEntity(
            firstName = request.firstName,
            lastName = request.lastName,
            email = request.email,
            password = "encodedPassword",
            userRole = UserRole.USER,
            provider = Provider.LOCAL,
            enabled = false
        )
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
        val userEntity = UserEntity(
            firstName = "John",
            lastName = "Doe",
            email = request.email,
            password = "password",
            userRole = UserRole.USER,
            provider = Provider.LOCAL,
            enabled = true
        )
        `when`(userRepository.findByEmail(request.email)).thenReturn(Optional.of(userEntity))
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
        val request = EnableReq()
        request.token = "verificationToken"
        val token = Token(
            userEntity = UserEntity(),
            token = request.token,
            tokenType = TokenType.VERIFICATION,
            expired = false,
            revoked = false
        )
        val userEntity = UserEntity(
            firstName = "John",
            lastName = "Doe",
            email = "johndoe@example.com",
            password = "password",
            userRole = UserRole.USER,
            provider = Provider.GOOGLE,
            enabled = true
        )
        `when`(tokenRepository.findTokenByToken(request.token)).thenReturn(Optional.of(token))
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
        val userEntity = UserEntity(
            firstName = "John",
            lastName = "Doe",
            email = request.email,
            password = "password",
            userRole = UserRole.USER,
            provider = Provider.GOOGLE,
            enabled = true
        )
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
        val user = UserEntity(
            firstName = "John",
            lastName = "Doe",
            email = req.email,
            password = "password",
            userRole = UserRole.USER,
            provider = Provider.LOCAL,
            enabled = true
        )
        `when`(userRepository.findByEmail(req.email)).thenReturn(Optional.of(user))
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
        val token = Token(
            userEntity = UserEntity(),
            token = req.token,
            tokenType = TokenType.RESET_PASSWORD,
            expired = false,
            revoked = false
        )
        `when`(tokenRepository.findTokenByToken(req.token)).thenReturn(Optional.of(token))
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
        val user = UserEntity(
            firstName = "John",
            lastName = "Doe",
            email = "johndoe@example.com",
            password = "password",
            userRole = UserRole.USER,
            provider = Provider.LOCAL,
            enabled = true
        )
        val authentication = Mockito.mock(Authentication::class.java)
        SecurityContextHolder.getContext().authentication = authentication

        `when`(authentication.principal).thenReturn(user)
        `when`(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user))
        `when`(passwordEncoder.matches(req.oldPassword, user.password)).thenReturn(true)
        `when`(passwordEncoder.encode(req.newPassword)).thenReturn("newPassword")

        // Act
        val updatePasswordResp = authenticationService.updatePassword(req)

        // Assert
        assertEquals(updatePasswordResp, updatePasswordResp)
    }

}
