package hu.bme.aut.collectoro.core.auth.dto

class SaveForgotPasswordReq(
    val token: String,
    val newPassword: String
)