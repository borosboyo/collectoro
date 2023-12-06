package hu.bme.aut.collectoro.core.user.dto

import hu.bme.aut.collectoro.core.user.UserEntity

data class EditUserResp(
    var user: UserEntity? = null
)