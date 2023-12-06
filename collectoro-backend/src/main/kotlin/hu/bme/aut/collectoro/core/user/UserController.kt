package hu.bme.aut.collectoro.core.user

import hu.bme.aut.collectoro.core.user.dto.*
import hu.bme.aut.collectoro.core.user.image.ImageService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.jetbrains.annotations.NotNull
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.ws.rs.PUT
import javax.ws.rs.Path
import javax.ws.rs.Produces

@Api(value = "UserController", description = "REST APIs related to User Entity")
@Path("/api/user")
@RestController
@RequestMapping("/api/user")
class UserController(
    private val userService: UserService,
    private val imageService: ImageService
) {

    @PUT
    @PutMapping("/getUserById")
    @Path("/getUserById")
    @Produces("application/json")
    @ApiOperation(value = "getUserById", response = GetUserByIdResp::class)
    fun getUserById(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "GetUserByIdReq"
        ) req: GetUserByIdReq
    ): GetUserByIdResp {
        return userService.getUserById(req)
    }


    @PUT
    @PutMapping("/getHomepageByUserEmail")
    @Path("/getHomepageByUserEmail")
    @Produces("application/json")
    @ApiOperation(value = "getHomepageByUserEmail", response = GetHomepageByUserEmailResp::class)
    fun getHomePageByUserEmail(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "GetHomePageByUserEmailReq"
        ) req: GetHomepageByUserEmailReq
    ): GetHomepageByUserEmailResp {
        return userService.getHomepageByUserEmail(req)
    }


    @PUT
    @PutMapping("/getProfileByUserEmail")
    @Path("/getProfileByUserEmail")
    @Produces("application/json")
    @ApiOperation(value = "getProfileByUserEmail", response = GetProfileByUserEmailResp::class)
    fun getProfileByUserEmail(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "GetHomePageByUserEmailReq"
        ) req: GetProfileByUserEmailReq
    ): GetProfileByUserEmailResp {
        return userService.getProfileByUserEmail(req)
    }


    @PUT
    @PutMapping("/getUsersByIds")
    @Path("/getUsersByIds")
    @Produces("application/json")
    @ApiOperation(value = "getUsersByIds", response = GetUsersByIdsResp::class)
    fun getUsersByIds(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "GetUsersByIdsReq"
        ) req: GetUsersByIdsReq
    ): GetUsersByIdsResp {
        return userService.getUsersByIds(req)
    }


}