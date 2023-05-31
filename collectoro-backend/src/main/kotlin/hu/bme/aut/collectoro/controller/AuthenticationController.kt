package hu.bme.aut.collectoro.controller

import hu.bme.aut.collectoro.dto.auth.*
import hu.bme.aut.collectoro.dto.user.EnableReq
import hu.bme.aut.collectoro.dto.user.EnableResp
import hu.bme.aut.collectoro.service.AuthenticationService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.jetbrains.annotations.NotNull
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.ws.rs.POST
import javax.ws.rs.PUT
import javax.ws.rs.Path
import javax.ws.rs.Produces

@Api(value = "AuthenticationController", description = "REST APIs related to Authentication")
@Path("/api/auth")
@RestController
@RequestMapping("/api/auth")
class AuthenticationController(
    private val authenticationService: AuthenticationService,
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
    @PostMapping("/enable")
    @Path("/enable")
    @Produces("application/json")
    @ApiOperation(value = "enable", response = EnableResp::class)
    fun enable(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "EnableReq"
        ) request: EnableReq
    ): ResponseEntity<EnableResp> {
        return ResponseEntity.ok(authenticationService.enable(request))
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

    @POST
    @PostMapping("/resetPassword")
    @Path("/resetPassword")
    @Produces("application/json")
    @ApiOperation(value = "resetPassword", response = ResetPasswordReq::class)
    fun resetPassword(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "ResetPasswordReq"
        ) request: ResetPasswordReq
    ): ResponseEntity<ResetPasswordResp> {
        return ResponseEntity.ok(authenticationService.resetPassword(request))
    }

    @POST
    @PostMapping("/saveForgotPassword")
    @Path("/saveForgotPassword")
    @Produces("application/json")
    @ApiOperation(value = "saveForgotPassword", response = SaveForgotPasswordResp::class)
    fun saveForgotPassword(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "EnableReq"
        ) request: SaveForgotPasswordReq
    ): ResponseEntity<SaveForgotPasswordResp> {
        return ResponseEntity.ok(authenticationService.saveForgotPassword(request))
    }

    @POST
    @PostMapping("/updatePassword")
    @Path("/updatePassword")
    @Produces("application/json")
    @ApiOperation(value = "updatePassword", response = UpdatePasswordResp::class)
    fun updatePassword(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "UpdatePasswordReq"
        ) request: UpdatePasswordReq
    ): ResponseEntity<UpdatePasswordResp> {
        return ResponseEntity.ok(authenticationService.updatePassword(request))
    }

}