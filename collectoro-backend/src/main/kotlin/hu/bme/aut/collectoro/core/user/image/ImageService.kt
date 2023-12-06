package hu.bme.aut.collectoro.core.user.image

import hu.bme.aut.collectoro.core.user.UserRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class ImageService(
    private val imageRepository: ImageRepository,
    private val userRepository: UserRepository
) {
    @Transactional
    @Throws(Exception::class)
    fun uploadImage(imageFile: MultipartFile, userEmail: String) {
        val user = userRepository.findByEmail(userEmail)
        val imageToSave = Image(
            name = user.getEmail(),
            type = imageFile.contentType,
            userEntity = user,
            imageData = ImageUtils.compressImage(imageFile.bytes)
        )
        user.avatar = imageToSave
        userRepository.save(user)
        imageRepository.save(imageToSave)
    }

    @Transactional
    fun downloadImage(imageName: String?): ByteArray? {
        val image = imageRepository.findByName(imageName)
        return try {
            return ImageUtils.decompressImage(image?.imageData)
        } catch (e: Exception) {
            null
        }
    }
}