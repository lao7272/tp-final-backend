import twilio from 'twilio';
import { logger } from '../logger/logger.js';
import "dotenv/config";
const sendWhatsappMessage = async ({body}) => {

    const accountSid = 'ACa4b239a3a6e733dff9ff40c64124d28d';
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = twilio(accountSid, authToken);

    const sendingPhone = '+14155238886';

    const phoneNumber =  process.env.PHONE || "+5493548401102";

    try {
        await client.messages.create({
            body: body,
            from: `whatsapp:${sendingPhone}`,
            to: `whatsapp:${phoneNumber}`
        });
    } catch (err) {
        logger.error(`Twilio error: ${err}`);
    }

}

export { sendWhatsappMessage }