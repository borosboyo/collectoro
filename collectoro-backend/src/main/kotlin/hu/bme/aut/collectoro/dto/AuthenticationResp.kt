package hu.bme.aut.collectoro.dto

class AuthenticationResp private constructor(
    var token: String? = null
){
    data class Builder(
        var token: String? = null
    ) {

        fun token(token: String?) = apply { this.token = token }
        fun build() = AuthenticationResp(token)
    }
}