package hu.bme.aut.collectoro.config.logging.exectime

import org.aspectj.lang.JoinPoint
import org.aspectj.lang.annotation.*
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component


@Component
@Aspect
class EndpointLogger {
    private val log = LoggerFactory.getLogger(this.javaClass)

    @Pointcut(API_POINT_CUT)
    fun logController() {
        // empty
    }

    private fun logDetails(joinPoint: JoinPoint) {
        log.info("Class: " + joinPoint.signature.declaringTypeName)
        log.info("Method: " + joinPoint.signature.name)
        log.info("Joinpont: $joinPoint")
    }


    @Before("logController()")
    fun logRequest(joinPoint: JoinPoint) {
        logDetails(joinPoint)
        log.info(createJoinPointForLogs(joinPoint, RestApiMessageType.REQUEST))
    }

    @AfterReturning("logController()")
    fun logsResponse(joinPoint: JoinPoint) {
        logDetails(joinPoint)
        log.info(createJoinPointForLogs(joinPoint, RestApiMessageType.RESPONSE))
    }

    @AfterThrowing(
        value = EXCEPTION_POINTCUT,
        throwing = "exception"
    )
    fun logsErrors(joinPoint: JoinPoint, exception: Throwable?) {
        logDetails(joinPoint)
    }

    private fun createJoinPointForLogs(joinPoint: JoinPoint, dataType: RestApiMessageType): String {
        if (joinPoint.args.isEmpty()) {
            return joinPoint.signature.name + " method called with no arguments"
        }
        //val obj = joinPoint.args
        val requestValue = StringBuilder()
        if (dataType == RestApiMessageType.REQUEST) {
            requestValue.append("Request value: ")
        } else {
            requestValue.append("Response value: ")
        }
        // Arrays.stream(obj).forEach { x: Any ->
        //     if (x.toString().length < 100) {
        //         requestValue.append(x.toString())
        //     } else {
        //         requestValue.append(x.toString().substring(0, 100))
        //     }
        // }
        requestValue.append("\r\n")
        return ""
    }

    companion object {
        //controllers are in the hu.bme.aut.collectoro.user, hu.bme.aut.collectoro.group, hu.bme.aut.collectoro.transaction packages
        //Exclude the hu.bme.aut.collectoro.core.auth package
        private const val API_POINT_CUT =
            "execution(* hu.bme.aut.collectoro..*.*(..)) && !execution(* hu.bme.aut.collectoro.config..*.*(..)) && !execution(* hu.bme.aut.collectoro.shared..*.*(..)) && !execution(* hu.bme.aut.collectoro.core.auth..*.*(..))"
        private const val EXCEPTION_POINTCUT =
            "execution(* hu.bme.aut.collectoro..*.*(..)) && !execution(* hu.bme.aut.collectoro.config..*.*(..)) && !execution(* hu.bme.aut.collectoro.config.logging..*.*(..)) && !execution(* hu.bme.aut.collectoro.shared..*.*(..)) && !execution(* hu.bme.aut.collectoro.core.auth..*.*(..))"
    }
}
