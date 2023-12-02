package hu.bme.aut.collectoro.core.user.image

import hu.bme.aut.collectoro.core.user.UserEntity
import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository


@Entity
data class Image(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,
    var name: String? = null,
    var type: String? = null,

    @Lob
    var imageData: ByteArray? = null,

    @OneToOne
    var userEntity: UserEntity? = null
)


@Repository
interface ImageRepository : JpaRepository<Image?, Long?> {
    fun findByName(name: String?): Image?
}