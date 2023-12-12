package hu.bme.aut.collectoro.core.group.dto

data class KickPersonFromGroupReq(
    val groupId: Long,
    val userId: Long
)
