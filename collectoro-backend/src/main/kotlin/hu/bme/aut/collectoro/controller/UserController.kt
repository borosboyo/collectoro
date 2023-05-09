package hu.bme.aut.collectoro.controller

import hu.bme.aut.collectoro.dto.user.GetUserByIdTsReq
import hu.bme.aut.collectoro.dto.user.GetUserByIdTsResp
import hu.bme.aut.collectoro.service.UserService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.jetbrains.annotations.NotNull
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces

@Api(value = "UserController", description = "REST APIs related to User Entity")
@Path("/api/user")
@RestController
@RequestMapping("/api/user")
class UserController(private val userService: UserService) {

    @POST
    @PostMapping("/getUserById")
    @Path("/getUserById")
    @Produces("application/json")
    @ApiOperation(value = "getUserById", response = GetUserByIdTsResp::class)
    fun getUserById(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "GetUserByIdTsReq"
        ) req: GetUserByIdTsReq
    ): GetUserByIdTsResp {
        return userService.getUserById(req)
    }
}