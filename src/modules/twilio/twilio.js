import twilio from 'twilio';
import { logger } from '../logger/logger.js';
import vars from '../../config/config.js';

const { ACCOUNT_SID, TWILIO_AUTH_TOKEN, PHONE_NUMBER} = vars;
const sendWhatsappMessage = async ({body}) => {

    const accountSid = ACCOUNT_SID;
    const authToken = TWILIO_AUTH_TOKEN;

    const client = twilio(accountSid, authToken);

    const sendingPhone = '+14155238886';

    const phoneNumber =  PHONE_NUMBER;

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