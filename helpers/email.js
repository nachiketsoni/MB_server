import path from "path"

export const EMAIL_TEMPLATE = {
    forgotPassword:path.join(__dirname,'../',`/views/emails/forget_password.ejs`),
    userRegistration:path.join(__dirname,'../',`/views/emails/user_registration.ejs`)
}

export const EMAIL_SUBJECT = {
    forgotPassword:"Reset Password link",
    userRegistration:"User Registration Link"
}