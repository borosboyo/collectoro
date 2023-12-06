package hu.bme.aut.collectoro.core.user.dto

import hu.bme.aut.collectoro.core.user.UserEntity

class GetUsersByGroupIdResp(
    val users: List<UserEntity>? = null
)