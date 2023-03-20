package hu.bme.aut.collectoro.domain

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.oauth2.core.user.OAuth2User


class CustomOAuth2User (
    private val oAuth2User: OAuth2User
) : OAuth2User {

    override fun getAttributes(): Map<String?, Any?>? {
        return oAuth2User.getAttributes()
    }

    override fun getAuthorities(): Collection<GrantedAuthority?>? {
        return oAuth2User.getAuthorities()
    }

    override fun getName(): String? {
        return oAuth2User.getAttribute("name")
    }

    fun getEmail(): String? {
        return oAuth2User.getAttribute("email")
    }

}