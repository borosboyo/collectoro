package hu.bme.aut.collectoro.dto.user

import hu.bme.aut.collectoro.domain.UserEntity

class GetUsersByGroupIdResp(
    val users: List<UserEntity>? = null
) {
}