package hu.bme.aut.collectoro.core.user.image

import com.fasterxml.jackson.annotation.JsonBackReference
import hu.bme.aut.collectoro.core.user.UserEntity
import jakarta.persistence.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository


@Entity
data class Image(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    @Column(unique = true)
    var name: String? = null,

    var type: String? = null,

    var base64: String? = null,

    @OneToOne
    @JsonBackReference(value = "imageUser")
    var userEntity: UserEntity? = null
)


@Repository
interface ImageRepository : JpaRepository<Image?, Long?> {
    fun findByName(name: String?): Image?
}