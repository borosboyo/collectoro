package hu.bme.aut.collectoro.core.user.dto

class EnableResp(
    var token: String? = null
) {
    data class Builder(
        var token: String? = null
    ) {

        fun token(token: String?) = apply { this.token = token }
        fun build() = EnableResp(token)
    }
}