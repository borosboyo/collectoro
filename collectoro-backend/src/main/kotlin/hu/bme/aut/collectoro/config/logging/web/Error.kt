package hu.bme.aut.collectoro.config.logging.web

import java.time.LocalDateTime


data class Error(
    val timestamp: LocalDateTime? = null,
    val message: String? = null,
    val details: String? = null
)