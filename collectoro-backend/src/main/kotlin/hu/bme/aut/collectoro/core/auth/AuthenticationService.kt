package hu.bme.aut.collectoro.core.auth

import hu.bme.aut.collectoro.core.auth.dto.*
import hu.bme.aut.collectoro.core.mail.EmailService
import hu.bme.aut.collectoro.core.mail.EmailType
import hu.bme.aut.collectoro.core.mail.Mail
import hu.bme.aut.collectoro.core.token.Token
import hu.bme.aut.collectoro.core.token.TokenRepository
import hu.bme.aut.collectoro.core.token.util.TokenType
import hu.bme.aut.collectoro.core.transaction.util.Wallet
import hu.bme.aut.collectoro.core.transaction.util.WalletRepository
import hu.bme.aut.collectoro.core.user.UserEntity
import hu.bme.aut.collectoro.core.user.UserRepository
import hu.bme.aut.collectoro.core.user.dto.EnableReq
import hu.bme.aut.collectoro.core.user.dto.EnableResp
import hu.bme.aut.collectoro.shared.provider.Provider
import jakarta.transaction.Transactional
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.util.Map

@Service
class AuthenticationService(
    private val userRepository: UserRepository,
    private val tokenRepository: TokenRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JWTService,
    private val authenticationManager: AuthenticationManager,
    private val emailService: EmailService,
    private val walletRepository: WalletRepository
) {

    @Transactional
    fun register(request: RegisterReq): AuthenticationResp? {
        //Create User And Token
        val userEntity = UserEntity(
            firstName = request.firstName,
            lastName = request.lastName,
            email = request.email,
            password = passwordEncoder.encode(request.password),
            enabled = false,
            provider = Provider.LOCAL,
        )
        val wallet = Wallet()
        wallet.userEntity = userEntity
        walletRepository.save(wallet)
        userEntity.wallet = wallet
        val savedUserEntity: UserEntity = userRepository.save(userEntity)
        val verificationToken: String = jwtService.generateToken(savedUserEntity)
        saveUserToken(savedUserEntity, verificationToken, TokenType.VERIFICATION)

        //Send verification token via email
        val mail: Mail = emailService.createMail(
            savedUserEntity.getEmail(),
            EmailType.CONFIRM_REGISTRATION,
            Map.of("token", verificationToken)
        )
        //emailService.sendMail(mail)

        println(verificationToken)

        return AuthenticationResp(
            message = "User registered successfully",
        )
    }

    @Transactional
    fun authenticate(request: AuthenticationReq): AuthenticationResp? {
        if (userRepository.findByEmail(request.email).isEnabled == false) {
            throw Exception("User is not enabled")
        } else {
            try {
                authenticationManager.authenticate(
                    UsernamePasswordAuthenticationToken(
                        request.email,
                        request.password
                    )
                )
            } catch (e: Exception) {
                throw Exception(e.message)
            }
            val userEntity: UserEntity? = userRepository.findByEmailAndProvider(request.email, Provider.LOCAL)
            val jwtToken: String = jwtService.generateToken(userEntity)
            if (userEntity != null) {
                revokeAllUserTokens(userEntity)
                saveUserToken(userEntity, jwtToken, TokenType.BEARER)
            }
            return AuthenticationResp(
                message = "User authenticated successfully",
                token = jwtToken
            )
        }
    }

    @Transactional
    fun enable(request: EnableReq): EnableResp? {
        val token: Token? = tokenRepository.findByToken(request.token).orElseThrow { Exception("Token not found") }
        var user = token?.userEntity
        user?.enabled = true
        val savedUserEntity = userRepository.save(user!!)
        val jwtToken: String = jwtService.generateToken(savedUserEntity)
        saveUserToken(savedUserEntity, jwtToken, TokenType.BEARER)
        return EnableResp.Builder()
            .token(jwtToken)
            .build()
    }

    private fun saveUserToken(userEntity: UserEntity, token: String, tokenType: TokenType) {
        val builtToken = Token(
            userEntity = userEntity,
            token = token,
            tokenType = tokenType,
            expired = false,
            revoked = false,
        )
        tokenRepository.save(builtToken)
    }

    private fun revokeAllUserTokens(userEntity: UserEntity) {
        val validUserTokens: List<Token?>? =
            tokenRepository.findAllNotExpiredOrRevokedTokenByUserEntityAnAndTokenType(userEntity.id, TokenType.BEARER)
        if (validUserTokens?.isEmpty() == true) return
        validUserTokens?.forEach { token ->
            token?.expired = true
            token?.revoked = true
        }
        tokenRepository.saveAll(validUserTokens as List<Token>)
    }

    @Transactional
    fun authenticateGoogle(request: GoogleAuthenticationReq): AuthenticationResp? {
        var userEntity: UserEntity? = userRepository.findByEmailAndProvider(request.email, Provider.GOOGLE)
        val jwtToken: String?
        if (userEntity == null) {
            userEntity = UserEntity(
                firstName = request.firstName,
                lastName = request.lastName,
                email = request.email,
                enabled = true,
                provider = Provider.GOOGLE,
            )
            val wallet = Wallet()
            wallet.userEntity = userEntity
            walletRepository.save(wallet)
            userEntity.wallet = wallet
            userRepository.save(userEntity)
            jwtToken = jwtService.generateToken(userEntity)
            revokeAllUserTokens(userEntity)
            saveUserToken(userEntity, jwtToken, TokenType.BEARER)
        } else {
            jwtToken = jwtService.generateToken(userEntity)
            revokeAllUserTokens(userEntity)
            saveUserToken(userEntity, jwtToken, TokenType.BEARER)
        }

        return AuthenticationResp(
            token = jwtToken,
        )
    }

    @Transactional
    fun resetPassword(req: ResetPasswordReq): ResetPasswordResp {
        val user: UserEntity = userRepository.findByEmail(req.email)
        val resetPasswordToken: String = jwtService.generateToken(user)
        saveUserToken(user, resetPasswordToken, TokenType.RESET_PASSWORD)

        //Send verification token via email
        //val mail: Mail = emailService.createMail(
        //    user.getEmail(),
        //    EmailType.CONFIRM_REGISTRATION,
        //    Map.of("token", resetPasswordToken)
        //)
        //emailService.sendMail(mail)

        println(resetPasswordToken)

        return ResetPasswordResp()
    }

    @Transactional
    fun saveForgotPassword(req: SaveForgotPasswordReq): SaveForgotPasswordResp {
        val token: Token? = tokenRepository.findByToken(req.token).orElseThrow { Exception("Token not found") }
        val user = token?.userEntity
        changeUserPassword(user!!, req.newPassword)
        return SaveForgotPasswordResp()
    }

    @Transactional
    fun updatePassword(req: UpdatePasswordReq): UpdatePasswordResp {
        val user: UserEntity =
            (SecurityContextHolder.getContext().authentication.principal as UserEntity).getEmail().let {
                userRepository.findByEmail(it)
            }

        if (user != null && passwordEncoder.matches(req.oldPassword, user.password)) {
            changeUserPassword(user, req.newPassword)
        }
        return UpdatePasswordResp()
    }

    fun changeUserPassword(user: UserEntity, password: String) {
        user.password = passwordEncoder.encode(password)
        userRepository.save(user)
    }

}