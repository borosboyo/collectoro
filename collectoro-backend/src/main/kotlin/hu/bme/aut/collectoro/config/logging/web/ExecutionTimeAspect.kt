package hu.bme.aut.collectoro.config.logging.web

import org.aspectj.lang.ProceedingJoinPoint
import org.aspectj.lang.annotation.Around
import org.aspectj.lang.annotation.Aspect
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import org.springframework.util.StopWatch


@Aspect
@Component
class ExecutionTimeAspect {
    private val logger = LoggerFactory.getLogger(this.javaClass)

    @Around("@annotation(hu.bme.aut.collectoro.config.logging.web.LogExecutionTime)")
    fun logExecutionTime(joinPoint: ProceedingJoinPoint): Any {
        val stopWatch = StopWatch()
        stopWatch.start()
        val proceed: Any = try {
            joinPoint.proceed()
        } catch (e: Throwable) {
            throw CustomRuntimeException(e)
        }
        stopWatch.stop()
        logger.info("\"{}\" executed in {} ms", joinPoint.signature, stopWatch.totalTimeMillis)
        return proceed
    }
}
