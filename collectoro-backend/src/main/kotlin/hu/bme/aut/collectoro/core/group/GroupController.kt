package hu.bme.aut.collectoro.core.group

import hu.bme.aut.collectoro.core.group.dto.*
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.jetbrains.annotations.NotNull
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.ws.rs.POST
import javax.ws.rs.PUT
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


    @PUT
    @PutMapping("/leaveGroup")
    @Path("/leaveGroup")
    @Produces("application/json")
    @ApiOperation(value = "leaveGroup", response = LeaveGroupResp::class)
    fun leaveGroup(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "LeaveGroupReq"
        ) request: LeaveGroupReq
    ): ResponseEntity<LeaveGroupResp> {
        return ResponseEntity.ok(groupService.leaveGroup(request))
    }

    @PUT
    @PutMapping("/getGroupPageAdditionalData")
    @Path("/getGroupPageAdditionalData")
    @Produces("application/json")
    @ApiOperation(value = "getGroupPageAdditionalData", response = GetGroupPageAdditionalDataResp::class)
    fun getGroupPageAdditionalData(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "GetGroupPageAdditionalDataReq"
        ) request: GetGroupPageAdditionalDataReq
    ): ResponseEntity<GetGroupPageAdditionalDataResp> {
        return ResponseEntity.ok(groupService.getGroupPageAdditionalData(request))
    }

}