package hu.bme.aut.collectoro.config

import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.ServletRequest
import jakarta.servlet.ServletResponse
import jakarta.servlet.http.HttpServletResponse
import org.springframework.web.filter.GenericFilterBean
import java.io.IOException


class CorsFilter : GenericFilterBean() {
    @Throws(IOException::class, ServletException::class)
    override fun doFilter(servletRequest: ServletRequest?, servletResponse: ServletResponse, filterChain: FilterChain) {
        val response = servletResponse as HttpServletResponse
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE")
        response.setHeader("Access-Control-Max-Age", "3600")
        response.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization, Content-Length, X-Requested-With"
        )
        filterChain.doFilter(servletRequest, servletResponse)
    }
}