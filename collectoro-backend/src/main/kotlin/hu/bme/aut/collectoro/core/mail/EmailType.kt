package hu.bme.aut.collectoro.core.mail


enum class EmailType(val emailSubject: String, val emailTemplate: String) {

    RESET_PASSWORD("Elfelejtett jelszó", "reset-password"),
    CONFIRM_REGISTRATION("Regisztráció megerősítése", "confirm-registration");
}