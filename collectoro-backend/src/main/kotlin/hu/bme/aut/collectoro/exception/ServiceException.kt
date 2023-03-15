package hu.bme.aut.collectoro.exception

class ServiceException(
    private val serialVersionUID: Long = 3882661372718700763L,
    message: String?
) : Exception(message) {
}