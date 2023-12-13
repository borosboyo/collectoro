package hu.bme.aut.collectoro.core.group.dto


data class EditGroupReq(
    val groupId: Long,
    val name: String,
    val selectedColorName: String
)