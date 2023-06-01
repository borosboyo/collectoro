package hu.bme.aut.collectoro.dto.user

import hu.bme.aut.collectoro.domain.GroupEntity
import hu.bme.aut.collectoro.domain.UserEntity

class GetHomepageByUserEmailResp(
    var user: UserEntity,
    var groups: List<GroupEntity>){
}