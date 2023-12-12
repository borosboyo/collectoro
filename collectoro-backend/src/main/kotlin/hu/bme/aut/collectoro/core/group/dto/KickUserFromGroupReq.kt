package hu.bme.aut.collectoro.core.group.dto

data class KickUserFromGroupReq(
    val groupId: Long,
    val userId: Long
)
