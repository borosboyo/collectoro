package hu.bme.aut.collectoro.config.logging.web

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus


@ResponseStatus(value = HttpStatus.NOT_FOUND)
class ResourceNotFoundException(message: String?) : Exception(message) {
    companion object {
        private const val serialVersionUID = 1L
    }
}

