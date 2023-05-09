package hu.bme.aut.collectoro.dto.auth

class SaveForgotPasswordReq(
    val token: String,
    val newPassword: String
)