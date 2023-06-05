package hu.bme.aut.collectoro.dto.user

import hu.bme.aut.collectoro.domain.UserEntity

class GetUsersByIdsResp {
    var users: List<UserEntity> = ArrayList<UserEntity>()
}