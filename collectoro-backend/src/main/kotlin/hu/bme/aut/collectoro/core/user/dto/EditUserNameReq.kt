package hu.bme.aut.collectoro.core.user.dto

data class EditUserNameReq(
    val email: String,
    val firstName: String,
    val lastName: String
)
