package hu.bme.aut.collectoro.config.test

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/demo")
class DemoController {

    @GetMapping
    fun sayHello(): ResponseEntity<String?>? {
        return ResponseEntity.ok("Hello from secured endpoint")
    }

}