import { createTransport } from "nodemailer";
import { logger } from "../logger/logger.js";

const sendVerificationEmail = async ({email, subject, html}) => {
    try {
        const transporter = createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'elfrieda.durgan@ethereal.email',
                pass: 'fpmQ5MexVgrhUFHqEQ'
            }
        });
    
        const opt =  {
            from: "elfrieda.durgan@ethereal.email",
            to: email,
            subject: subject,
            text: html
        };
    
        const info = await transporter.sendMail(opt, (err, info) => {
            if (err) {
                console.error(err);
            }
            console.log(info)
        });
    } catch (err) {
        logger.error(`NodeMailer:  ${err}`)
    }
}

export {sendVerificationEmail}