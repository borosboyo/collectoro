package hu.bme.aut.collectoro.config

import hu.bme.aut.collectoro.domain.CustomOAuth2User
import hu.bme.aut.collectoro.service.CustomOAuth2UserService
import hu.bme.aut.collectoro.service.UserService
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.authentication.logout.LogoutHandler
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import java.io.IOException
import java.util.*


@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val authenticationProvider: AuthenticationProvider,
    private val jwtAuthFilter: JWTAuthenticationFilter,
    private val userService: UserService,
    private val logoutHandler: LogoutHandler
)  {

    @Bean
    fun filterChain(http: HttpSecurity) : SecurityFilterChain {
        http
            .cors().and()
            .csrf().disable()
            .authorizeHttpRequests()
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated().and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter::class.java)
            .logout()
                .logoutUrl("/api/auth/logout")
                .addLogoutHandler(logoutHandler)
                .logoutSuccessHandler { request: HttpServletRequest?, response: HttpServletResponse?, authentication: Authentication? -> SecurityContextHolder.clearContext() }

        return http.build();
    }

}
