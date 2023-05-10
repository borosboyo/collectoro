package hu.bme.aut.collectoro.controller

import hu.bme.aut.collectoro.dto.group.CreateGroupReq
import hu.bme.aut.collectoro.dto.group.CreateGroupResp
import hu.bme.aut.collectoro.dto.group.JoinGroupReq
import hu.bme.aut.collectoro.dto.group.JoinGroupResp
import hu.bme.aut.collectoro.service.GroupService
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
import javax.ws.rs.Path
import javax.ws.rs.Produces

@Api(value = "GroupController", description = "REST APIs related to Group")
@Path("/api/group")
@RestController
@RequestMapping("/api/group")
class GroupController(
    private val groupService: GroupService
) {

    @POST
    @PostMapping("/joinGroup")
    @Path("/joinGroup")
    @Produces("application/json")
    @ApiOperation(value = "joinGroup", response = JoinGroupResp::class)
    fun joinGroup(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "JoinGroupReq"
        ) request: JoinGroupReq
    ): ResponseEntity<JoinGroupResp> {
        return ResponseEntity.ok(groupService.joinGroup(request))
    }

    @POST
    @PostMapping("/createGroup")
    @Path("/createGroup")
    @Produces("application/json")
    @ApiOperation(value = "createGroup", response = CreateGroupResp::class)
    fun createGroup(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "CreateGroupReq"
        ) request: CreateGroupReq
    ): ResponseEntity<CreateGroupResp> {
        return ResponseEntity.ok(groupService.createGroup(request))
    }
}