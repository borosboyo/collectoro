package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.domain.Role
import hu.bme.aut.collectoro.domain.Token
import hu.bme.aut.collectoro.domain.TokenType
import hu.bme.aut.collectoro.domain.UserEntity
import hu.bme.aut.collectoro.dto.AuthenticationReq
import hu.bme.aut.collectoro.dto.AuthenticationResp
import hu.bme.aut.collectoro.dto.RegisterReq
import hu.bme.aut.collectoro.repository.UserRepository
import hu.bme.aut.collectoro.repository.TokenRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthenticationService(
    private val userRepository: UserRepository,
    private val tokenRepository: TokenRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JWTService,
    private val authenticationManager: AuthenticationManager,
) {

    fun register(request: RegisterReq): AuthenticationResp? {
        val userEntity: UserEntity = UserEntity.Builder()
            .firstName(request.firstName)
            .lastName(request.lastName)
            .email(request.email)
            .password(passwordEncoder.encode(request.password))
            .role(Role.USER)
            .build()
        val savedUserEntity: UserEntity = userRepository.save(userEntity)
        val jwtToken: String = jwtService.generateToken(userEntity)
        saveUserToken(savedUserEntity, jwtToken)
        return AuthenticationResp.Builder()
            .token(jwtToken)
            .build()
    }

    fun authenticate(request: AuthenticationReq): AuthenticationResp? {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                request.email,
                request.password
            )
        )
        val userEntity: UserEntity? = userRepository.findByEmail(request.email)
        val jwtToken: String = jwtService.generateToken(userEntity)
        if (userEntity != null) {
            revokeAllUserTokens(userEntity)
        }
        if (userEntity != null) {
            saveUserToken(userEntity, jwtToken)
        }
        return AuthenticationResp.Builder()
            .token(jwtToken)
            .build()
    }

    private fun saveUserToken(userEntity: UserEntity, jwtToken: String) {
        val token: Token = Token.Builder()
            .user(userEntity)
            .token(jwtToken)
            .tokenType(TokenType.BEARER)
            .expired(false)
            .revoked(false)
            .build()
        tokenRepository.save(token)
    }

    private fun revokeAllUserTokens(userEntity: UserEntity) {
        val validUserTokens: List<Token?>? = tokenRepository.findAllNotExpiredOrRevokedTokenByUserEntity(userEntity.id)
        if (validUserTokens?.isEmpty() == true) return
        validUserTokens?.forEach { token ->
            token?.expired = true
            token?.revoked = true
        }
        tokenRepository.saveAll(validUserTokens as List<Token>)
    }


}