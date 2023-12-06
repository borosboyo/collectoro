package hu.bme.aut.collectoro.core.group.dto

import hu.bme.aut.collectoro.core.group.GroupEntity

class GetGroupByUserResp(findByUsers: List<GroupEntity>) {
    var groups: List<GroupEntity> = findByUsers
}