package hu.bme.aut.collectoro.dto

import hu.bme.aut.collectoro.domain.User

class UserDto(base: User) {
    var id: Long
    var displayName: String

    init {
        this.id = base.id
        this.displayName = base.displayName
    }
}
