package hu.bme.aut.collectoro.core.user.dto

import org.springframework.web.multipart.MultipartFile

data class UploadImageReq(
    val image: MultipartFile,
    val userEmail: String
)