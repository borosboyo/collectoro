package hu.bme.aut.collectoro

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class CollectoroBackendApplication


fun main(args: Array<String>) {
    runApplication<CollectoroBackendApplication>(*args)

}