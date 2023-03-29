package hu.bme.aut.collectoro.controller

import hu.bme.aut.collectoro.dto.auth.AuthenticationReq
import hu.bme.aut.collectoro.dto.auth.AuthenticationResp
import hu.bme.aut.collectoro.dto.auth.GoogleAuthenticationReq
import hu.bme.aut.collectoro.dto.auth.RegisterReq
import hu.bme.aut.collectoro.service.AuthenticationService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.jetbrains.annotations.NotNull
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces

@Api(value = "AuthenticationController", description = "REST APIs related to Authentication")
@Path("/api/auth")
@RestController
@RequestMapping("/api/auth")
class AuthenticationController(
    private val authenticationService: AuthenticationService,
    private val logger: Logger = LoggerFactory.getLogger(AuthenticationController::class.java)
) {

    @POST
    @PostMapping("/register")
    @Path("/register")
    @Produces("application/json")
    @ApiOperation(value = "register", response = AuthenticationResp::class)
    fun register(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "RegisterReq"
        ) request: RegisterReq
    ): ResponseEntity<AuthenticationResp> {
        return ResponseEntity.ok(authenticationService.register(request))
    }

    @POST
    @PostMapping("/authenticate")
    @Path("/authenticate")
    @Produces("application/json")
    @ApiOperation(value = "authenticate", response = AuthenticationResp::class)
    fun authenticate(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "AuthenticationReq"
        ) request: AuthenticationReq
    ): ResponseEntity<AuthenticationResp> {
        return ResponseEntity.ok(authenticationService.authenticate(request))
    }

    @POST
    @PostMapping("/authenticate/google")
    @Path("/authenticate/google")
    @Produces("application/json")
    @ApiOperation(value = "authenticateGoogle", response = AuthenticationResp::class)
    fun authenticateGoogle(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "GoogleAuthenticationReq"
        ) request: GoogleAuthenticationReq
    ): ResponseEntity<AuthenticationResp> {
        return ResponseEntity.ok(authenticationService.authenticateGoogle(request))
    }


}