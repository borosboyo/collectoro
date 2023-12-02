package hu.bme.aut.collectoro.core.user.dto

import hu.bme.aut.collectoro.core.group.GroupEntity
import hu.bme.aut.collectoro.core.user.UserEntity

class GetHomepageByUserEmailResp(
    var user: UserEntity,
    var groups: List<GroupEntity>
)