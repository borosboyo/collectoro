package hu.bme.aut.collectoro.config.logging.web

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import java.time.LocalDateTime


@ControllerAdvice
class GlobalExceptionHandler : ResponseEntityExceptionHandler() {
    @ExceptionHandler(ResourceNotFoundException::class)
    fun resourceNotFoundException(ex: ResourceNotFoundException, request: WebRequest): ResponseEntity<Error> {
        val timestamp = LocalDateTime.now()
        val errorDetails = Error(timestamp, ex.message, request.getDescription(false))
        return ResponseEntity(errorDetails, HttpStatus.NOT_FOUND)
    }

    @ExceptionHandler(Exception::class)
    fun globalExceptionHandler(ex: Exception, request: WebRequest): ResponseEntity<Error> {
        val timestamp = LocalDateTime.now()
        val errorDetails = Error(timestamp, ex.message, request.getDescription(false))
        return ResponseEntity(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

