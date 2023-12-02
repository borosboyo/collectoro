package hu.bme.aut.collectoro.core.mail

import jakarta.mail.MessagingException
import jakarta.mail.internet.MimeMessage
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.thymeleaf.context.Context
import org.thymeleaf.spring6.ISpringTemplateEngine
import java.io.StringWriter
import java.io.UnsupportedEncodingException

@Service
class EmailService {
    @Autowired
    private val mailSender: JavaMailSender? = null

    @Autowired
    private val templateEngine: ISpringTemplateEngine? = null

    @Transactional
    @Throws(
        MessagingException::class,
        UnsupportedEncodingException::class
    )
    fun sendMail(message: Mail) {
        val emailMessage: MimeMessage = mailSender!!.createMimeMessage()
        val mailBuilder = MimeMessageHelper(emailMessage, true)
        mailBuilder.setFrom(message.getMailFrom(), "Collectoro Team")
        mailBuilder.setTo(message.getMailTo())
        mailBuilder.setSubject(message.getMailSubject())
        mailBuilder.setText(message.getMailContent(), true)
        mailSender.send(emailMessage)
    }

    @Transactional
    fun createMail(to: String, emailType: EmailType, variables: Map<String, Any>): Mail {
        val thymeleafContext = Context()
        thymeleafContext.setVariables(variables)
        val stringWriter = StringWriter()
        templateEngine?.process(emailType.emailTemplate, thymeleafContext, stringWriter)
        val result = Mail()
        result.setMailTo(to)
        result.setMailFrom("boros.gergo@hotmail.com")
        result.setMailContent(stringWriter.toString())
        result.setMailSubject(emailType.emailSubject)
        return result
    }
}