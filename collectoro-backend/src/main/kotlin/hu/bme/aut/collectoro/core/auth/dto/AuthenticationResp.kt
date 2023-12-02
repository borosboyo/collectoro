package hu.bme.aut.collectoro.core.auth.dto

data class AuthenticationResp(
    var token: String? = null,
    var message: String? = null
)