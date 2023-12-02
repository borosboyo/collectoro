package hu.bme.aut.collectoro.core.mail

class Mail(
    private var mailFrom: String,
    private var mailTo: String,
    private var mailSubject: String,
    private var mailContent: String
) {
    fun setMailFrom(mailFrom: String) = apply { this.mailFrom = mailFrom }
    fun setMailTo(mailTo: String) = apply { this.mailTo = mailTo }
    fun setMailSubject(mailSubject: String) = apply { this.mailSubject = mailSubject }
    fun setMailContent(mailContent: String) = apply { this.mailContent = mailContent }
    fun getMailFrom() = mailFrom
    fun getMailTo() = mailTo
    fun getMailSubject() = mailSubject
    fun getMailContent() = mailContent

    constructor() : this("", "", "", "")
}