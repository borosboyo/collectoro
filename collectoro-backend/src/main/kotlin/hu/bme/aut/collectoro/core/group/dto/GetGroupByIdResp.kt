package hu.bme.aut.collectoro.core.group.dto

import hu.bme.aut.collectoro.core.group.GroupEntity

class GetGroupByIdResp(findById: GroupEntity) {
    var group: GroupEntity = findById
}