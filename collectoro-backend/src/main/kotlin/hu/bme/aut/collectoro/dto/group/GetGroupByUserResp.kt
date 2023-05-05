package hu.bme.aut.collectoro.dto.group

import hu.bme.aut.collectoro.domain.GroupEntity

class GetGroupByUserResp(findByUsers: List<GroupEntity>) {
    var groups: List<GroupEntity> = findByUsers
}