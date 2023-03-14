import { createTransport } from "nodemailer";
import { logger } from "../logger/logger.js";
import vars from "../../config/config.js";


const { MAIL_PASSWORD } = vars;
const sendVerificationEmail = async ({email, subject, html}) => {
    try {
        const transporter = createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: { 
                user: 'elfrieda.durgan@ethereal.email',
                pass: MAIL_PASSWORD
            }
        });
    
        const opt =  {
            from: "elfrieda.durgan@ethereal.email",
            to: email,
            subject: subject,
            text: html
        };
    
        await transporter.sendMail(opt, (err, info) => {
            if (err) {
                console.error(err);
            }
        });
    } catch (err) {
        logger.error(`NodeMailer: ${err}`)
    }
}

export {sendVerificationEmail}