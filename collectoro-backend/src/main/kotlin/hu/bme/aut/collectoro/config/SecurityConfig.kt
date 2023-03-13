package hu.bme.aut.collectoro.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer.withDefaults
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import java.util.*


@Configuration
@EnableWebSecurity
class SecurityConfig  {

    @Bean
    fun filterChain(http: HttpSecurity) : SecurityFilterChain {
        http
            .authorizeHttpRequests { requests ->
                requests
                    .requestMatchers("/api/user", "/home").permitAll()
                    .anyRequest().permitAll()
            }
            .httpBasic(withDefaults());

        http.addFilterAfter(CorsFilter(), BasicAuthenticationFilter::class.java)
        return http.build();
    }


    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource? {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = Arrays.asList("http://localhost:19006")
        configuration.allowedMethods = Arrays.asList("GET", "POST", "PUT", "DELETE")
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }
}
