package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.domain.*
import hu.bme.aut.collectoro.dto.auth.*
import hu.bme.aut.collectoro.dto.user.EnableReq
import hu.bme.aut.collectoro.dto.user.EnableResp
import hu.bme.aut.collectoro.repository.TokenRepository
import hu.bme.aut.collectoro.repository.UserRepository
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
    private val emailService: EmailService
) {

    @Transactional
    fun register(request: RegisterReq): AuthenticationResp? {
        //Create User And Token
        val userEntity: UserEntity = UserEntity.Builder()
            .firstName(request.firstName)
            .lastName(request.lastName)
            .email(request.email)
            .password(passwordEncoder.encode(request.password))
            .role(Role.USER)
            .provider(Provider.LOCAL)
            .enabled(false)
            .build()
        val savedUserEntity: UserEntity = userRepository.save(userEntity)
        val verificationToken: String = jwtService.generateToken(savedUserEntity)
        saveUserToken(savedUserEntity, verificationToken, TokenType.VERIFICATION)

        //Send verification token via email
        val mail: Mail = emailService.createMail(
            savedUserEntity.getEmail(),
            EmailType.CONFIRM_REGISTRATION,
            Map.of("token", verificationToken)
        )
        emailService.sendMail(mail)

        return AuthenticationResp.Builder()
            .message("User registered successfully")
            .build()
    }

    @Transactional
    fun authenticate(request: AuthenticationReq): AuthenticationResp? {
        if (userRepository.findByEmail(request.email)?.isEnabled == false) {
            throw Exception("User is not enabled")
        } else {
            authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    request.email,
                    request.password
                )
            )
            val userEntity: UserEntity? = userRepository.findByEmailAndProvider(request.email, Provider.LOCAL)
            val jwtToken: String = jwtService.generateToken(userEntity)
            if (userEntity != null) {
                revokeAllUserTokens(userEntity)
                saveUserToken(userEntity, jwtToken, TokenType.BEARER)
            }
            return AuthenticationResp.Builder()
                .token(jwtToken)
                .build()
        }
    }

    @Transactional
    fun enable(request: EnableReq): EnableResp? {
        val token: Token? = tokenRepository.findByToken(request.token)?.orElseThrow { Exception("Token not found") }
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
        val builtToken: Token = Token.Builder()
            .user(userEntity)
            .token(token)
            .tokenType(tokenType)
            .expired(false)
            .revoked(false)
            .build()
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
            userEntity = UserEntity.Builder()
                .firstName(request.firstName)
                .lastName(request.lastName)
                .email(request.email)
                .role(Role.USER)
                .provider(Provider.GOOGLE)
                .enabled(true)
                .build()
            userRepository.save(userEntity)
            jwtToken = jwtService.generateToken(userEntity)
            revokeAllUserTokens(userEntity)
            saveUserToken(userEntity, jwtToken, TokenType.BEARER)
        } else {
            jwtToken = jwtService.generateToken(userEntity)
            revokeAllUserTokens(userEntity)
            saveUserToken(userEntity, jwtToken, TokenType.BEARER)
        }

        return AuthenticationResp.Builder()
            .token(jwtToken)
            .build()
    }

    @Transactional
    fun resetPassword(req: ResetPasswordReq): ResetPasswordResp {
        val user: UserEntity = userRepository.findByEmail(req.email) ?: throw Exception("User not found")
        val resetPasswordToken: String = jwtService.generateToken(user)
        saveUserToken(user, resetPasswordToken, TokenType.RESET_PASSWORD)

        //Send verification token via email
        val mail: Mail = emailService.createMail(
            user.getEmail(),
            EmailType.CONFIRM_REGISTRATION,
            Map.of("token", resetPasswordToken)
        )
        emailService.sendMail(mail)

        return ResetPasswordResp()
    }

    @Transactional
    fun saveForgotPassword(req: SaveForgotPasswordReq): SaveForgotPasswordResp {
        val token: Token? = tokenRepository.findByToken(req.token)?.orElseThrow { Exception("Token not found") }
        val user = token?.userEntity
        changeUserPassword(user!!, req.newPassword)
        return SaveForgotPasswordResp()
    }

    @Transactional
    fun updatePassword(req: UpdatePasswordReq): UpdatePasswordResp {
        val user: UserEntity? =
            (SecurityContextHolder.getContext().authentication.principal as UserEntity).getEmail().let {
                userRepository.findByEmail(it)
            }
        if (user != null) {
            changeUserPassword(user, req.newPassword)
        }
        return UpdatePasswordResp()
    }

    fun changeUserPassword(user: UserEntity, password: String) {
        user.password = passwordEncoder.encode(password)
        userRepository.save(user)
    }

}