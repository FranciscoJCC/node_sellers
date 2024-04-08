const nodemailer = require('nodemailer');
const { CONFIG } = require('./../config/config');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: CONFIG.smtpHost,
            port: CONFIG.portEmail,
            secure: true,
            auth: {
                user: CONFIG.userEmail,
                pass: CONFIG.emailPasword
            }
        });
    }

    async sendEmail(emailData){
        return await this.transporter.sendMail({
            from: emailData.from,
            to: emailData.to,
            subject: emailData.subject,
            html: emailData.html
        });
    }
}

module.exports = MailService;