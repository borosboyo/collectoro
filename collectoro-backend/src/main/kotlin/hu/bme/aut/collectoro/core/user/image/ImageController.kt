package hu.bme.aut.collectoro.core.user.image

import hu.bme.aut.collectoro.core.group.dto.JoinGroupResp
import hu.bme.aut.collectoro.core.user.dto.DownloadImageReq
import hu.bme.aut.collectoro.core.user.dto.DownloadImageResp
import hu.bme.aut.collectoro.core.user.dto.UploadImageReq
import hu.bme.aut.collectoro.core.user.dto.UploadImageResp
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.jetbrains.annotations.NotNull
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.MediaType.IMAGE_PNG_VALUE
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import javax.ws.rs.*


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
    @Consumes("multipart/form-data")
    @ApiOperation(value = "uploadImage", response = UploadImageResp::class)
    fun uploadImage(
        @RequestParam("userEmail") userEmail: Array<String>,
        @RequestParam("base64") base64: Array<String>
    ): ResponseEntity<*> {
        imageService.uploadImage(userEmail, base64)
        return ResponseEntity.status(HttpStatus.OK).body("Done")
    }

    @PUT
    @PutMapping("/downloadImage")
    @Path("/downloadImage")
    @Produces("application/json")
    @Consumes("application/json")
    @ApiOperation(value = "downloadImage", response = DownloadImageResp::class)
    fun downloadImage(
        @RequestBody @NotNull @ApiParam(
            required = false,
            value = "DownloadImageReq"
        ) req: DownloadImageReq
    ): DownloadImageResp {
        return imageService.downloadImage(req.imageName)
    }
}