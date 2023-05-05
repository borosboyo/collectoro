package hu.bme.aut.collectoro.domain

import jakarta.persistence.*
import java.util.*

private const val EXPIRATION: Int = 60 * 24

@Entity
class PasswordResetToken(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    private var token: String? = null,

    @OneToOne(targetEntity = UserEntity::class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id", foreignKey = ForeignKey(name = "FK_VERIFY_USER"))
    private val user: UserEntity? = null,

    private var expiryDate: Date? = null
) {

    data class Builder(
        var id: Long = 0,
        var token: String? = null,
        var user: UserEntity? = null,
        var expiryDate: Date? = null
    ) {

        private fun calculateExpiryDate(expiryTimeInMinutes: Int): Date {
            val cal = Calendar.getInstance()
            cal.timeInMillis = Date().time
            cal.add(Calendar.MINUTE, expiryTimeInMinutes)
            return Date(cal.time.time)
        }

        fun id(id: Long) = apply { this.id = id }
        fun token(token: String?) = apply { this.token = token }
        fun user(user: UserEntity?) = apply { this.user = user }
        fun expiryDate() = apply { this.expiryDate = calculateExpiryDate(EXPIRATION) }
        fun build() = PasswordResetToken(id, token, user, expiryDate)
    }

}