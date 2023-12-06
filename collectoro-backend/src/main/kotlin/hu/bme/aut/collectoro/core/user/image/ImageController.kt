package hu.bme.aut.collectoro.core.user.image

import hu.bme.aut.collectoro.core.group.dto.JoinGroupResp
import hu.bme.aut.collectoro.core.user.dto.DownloadImageReq
import hu.bme.aut.collectoro.core.user.dto.DownloadImageResp
import hu.bme.aut.collectoro.core.user.dto.UploadImageReq
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.jetbrains.annotations.NotNull
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.MediaType.IMAGE_PNG_VALUE
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.ws.rs.POST
import javax.ws.rs.PUT
import javax.ws.rs.Path
import javax.ws.rs.Produces


@Api(value = "ImageController", description = "REST APIs related to Image")
@Path("/api/image")
@RestController
@RequestMapping("/api/image")
class ImageController(
    private val imageService: ImageService
) {
    @POST
    @PostMapping("/uploadImage")
    @Path("/uploadImage")
    @Produces("application/json")
    @ApiOperation(value = "uploadImage", response = UploadImageReq::class)
    fun uploadImage(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "UploadImageReq"
        ) req: UploadImageReq
    ): ResponseEntity<*> {
        imageService.uploadImage(req.image, req.userEmail)
        return ResponseEntity.status(HttpStatus.OK).body("Done")
    }

    @PUT
    @PutMapping("/downloadImage")
    @Path("/downloadImage")
    @Produces("application/json")
    @ApiOperation(value = "downloadImage", response = JoinGroupResp::class)
    fun downloadImage(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "DownloadImageReq"
        ) req: DownloadImageReq
    ): ResponseEntity<DownloadImageResp> {
        val imageData = imageService.downloadImage(req.imageName)
        return ResponseEntity.status(HttpStatus.OK)
            .contentType(MediaType.valueOf(IMAGE_PNG_VALUE))
            .body<DownloadImageResp>(DownloadImageResp(image = imageData!!))
    }
}