package hu.bme.aut.collectoro.domain

import jakarta.persistence.*;
import java.io.Serializable


@Entity
@Table(name = "app_user")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val displayName: String = "",

) : Serializable {

}