package hu.bme.aut.collectoro.dto.group

import hu.bme.aut.collectoro.domain.GroupEntity

class GetGroupByIdResp(findById: GroupEntity) {
    var group: GroupEntity = findById
}