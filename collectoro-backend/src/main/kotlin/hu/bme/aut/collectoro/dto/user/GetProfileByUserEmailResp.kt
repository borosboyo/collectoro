package hu.bme.aut.collectoro.dto.user

import hu.bme.aut.collectoro.domain.UserEntity

class GetProfileByUserEmailResp(userEntity: UserEntity) {
    var user: UserEntity = userEntity
}