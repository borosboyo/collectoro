package hu.bme.aut.collectoro.core.user.dto

import hu.bme.aut.collectoro.core.user.UserEntity

class GetProfileByUserEmailResp(userEntity: UserEntity) {
    var user: UserEntity = userEntity
}