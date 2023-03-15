package hu.bme.aut.collectoro.controller

import com.nimbusds.openid.connect.sdk.AuthenticationRequest
import hu.bme.aut.collectoro.dto.AuthenticationReq
import hu.bme.aut.collectoro.dto.AuthenticationResp
import hu.bme.aut.collectoro.dto.RegisterReq
import hu.bme.aut.collectoro.service.AuthenticationService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api/auth")
class AuthenticationController(
    private val authenticationService: AuthenticationService,
    private val logger: Logger = LoggerFactory.getLogger(AuthenticationController::class.java)
) {

   @PostMapping("/register")
   fun register(
       @RequestBody request: RegisterReq
   ): ResponseEntity<AuthenticationResp> {
       return ResponseEntity.ok(authenticationService.register(request))
   }

   @PostMapping("/authenticate")
   fun authenticate(
       @RequestBody request: AuthenticationReq
   ): ResponseEntity<AuthenticationResp> {
       return ResponseEntity.ok(authenticationService.authenticate(request))
   }

}