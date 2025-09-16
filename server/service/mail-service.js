const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    }

    async sendActivationMail(to, link) {
        try {
            await this.transporter.sendMail({
                from: `"Your App" <${process.env.SMTP_USER}>`,
                to,
                subject: `Account Activation - ${process.env.API_URL}`,
                text: '',
                html: `
                    <div>
                        <h1>Activation Link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
            });
            console.log(`Activation email sent to ${to}`);
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error(`Failed to send activation email: ${error.message}`);
        }
    }
}

module.exports = new MailService();