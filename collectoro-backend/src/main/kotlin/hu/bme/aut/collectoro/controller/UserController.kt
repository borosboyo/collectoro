package hu.bme.aut.collectoro.controller

import hu.bme.aut.collectoro.service.UserService
import lombok.RequiredArgsConstructor
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/user")
class UserController(private val userService: UserService) {


    @GetMapping
    fun findAll() = userService.findAll();
    
    @GetMapping("/{id}")
    fun findById(@PathVariable id: Long) = userService.findById(id);
}