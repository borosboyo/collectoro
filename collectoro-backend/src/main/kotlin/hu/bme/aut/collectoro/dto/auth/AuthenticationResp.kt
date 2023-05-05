package hu.bme.aut.collectoro.dto.auth

class AuthenticationResp private constructor(
    var token: String? = null,
    var message: String? = null
){
    data class Builder(
        var token: String? = null,
        var message: String? = null
    ) {
        fun token(token: String?) = apply { this.token = token }
        fun message(message: String?) = apply { this.message = message }
        fun build() = AuthenticationResp(token, message)
    }
}