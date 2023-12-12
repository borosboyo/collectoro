package hu.bme.aut.collectoro.core.user.image

import hu.bme.aut.collectoro.core.user.UserRepository
import hu.bme.aut.collectoro.core.user.dto.DownloadImageResp
import hu.bme.aut.collectoro.core.user.dto.UploadImageResp
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class ImageService(
    private val imageRepository: ImageRepository,
    private val userRepository: UserRepository
) {
    @Transactional
    @Throws(Exception::class)
    fun uploadImage( userEmail: Array<String>, base64: Array<String>): UploadImageResp {
        val user = userRepository.findByEmail(userEmail[0]).get()
        val image = imageRepository.findByName(user.getEmail())
        if (image != null) {
            image.base64 = base64[0]
            image.userEntity = user
            imageRepository.save(image)
            user.image = image
            userRepository.save(user)
        } else {
            val imageToSave = Image(
                name = user.getEmail(),
                type = "image/png",
                base64 = base64[0],
                userEntity = user
            )
            user.image = imageToSave
            userRepository.save(user)
            imageRepository.save(imageToSave)
        }

        return UploadImageResp(
            imageId = user.getEmail()
        )
    }

    @Transactional
    fun downloadImage(imageName: String?): DownloadImageResp {
        val image = imageRepository.findByName(imageName)
        if (image != null) {
            return DownloadImageResp(
                base64 = image.base64!!
            )
        }
        return DownloadImageResp(
            base64 = ""
        )
    }
}