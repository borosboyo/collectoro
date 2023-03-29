package hu.bme.aut.collectoro.service

import hu.bme.aut.collectoro.domain.*
import hu.bme.aut.collectoro.dto.auth.AuthenticationReq
import hu.bme.aut.collectoro.dto.auth.AuthenticationResp
import hu.bme.aut.collectoro.dto.auth.GoogleAuthenticationReq
import hu.bme.aut.collectoro.dto.auth.RegisterReq
import hu.bme.aut.collectoro.repository.UserRepository
import hu.bme.aut.collectoro.repository.TokenRepository
import jakarta.transaction.Transactional
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

    @Transactional
    fun register(request: RegisterReq): AuthenticationResp? {
        val userEntity: UserEntity = UserEntity.Builder()
            .firstName(request.firstName)
            .lastName(request.lastName)
            .email(request.email)
            .password(passwordEncoder.encode(request.password))
            .role(Role.USER)
            .provider(Provider.LOCAL)
            .build()
        val savedUserEntity: UserEntity = userRepository.save(userEntity)
        val jwtToken: String = jwtService.generateToken(userEntity)
        saveUserToken(savedUserEntity, jwtToken)
        return AuthenticationResp.Builder()
            .token(jwtToken)
            .build()
    }

    @Transactional
    fun authenticate(request: AuthenticationReq): AuthenticationResp? {
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

    @Transactional
    fun authenticateGoogle(request: GoogleAuthenticationReq): AuthenticationResp? {
        var userEntity: UserEntity? = userRepository.findByEmailAndProvider(request.email, Provider.GOOGLE)
        val jwtToken: String?;
        if(userEntity == null) {
           userEntity = UserEntity.Builder()
                .firstName(request.firstName)
                .lastName(request.lastName)
                .email(request.email)
                .role(Role.USER)
                .provider(Provider.GOOGLE)
                .build()
            userRepository.save(userEntity)
            jwtToken= jwtService.generateToken(userEntity)
            revokeAllUserTokens(userEntity)
            saveUserToken(userEntity, jwtToken)
        } else {
            jwtToken= jwtService.generateToken(userEntity)
            revokeAllUserTokens(userEntity)
            saveUserToken(userEntity, jwtToken)
        }

        return AuthenticationResp.Builder()
            .token(jwtToken)
            .build()
    }


}