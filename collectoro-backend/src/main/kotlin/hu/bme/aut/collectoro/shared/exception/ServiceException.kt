package hu.bme.aut.collectoro.shared.exception

class ServiceException(
    private val serialVersionUID: Long = 3882661372718700763L,
    message: String?
) : Exception(message)