package hu.bme.aut.collectoro.dto.user

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