import "dotenv/config";

const vars = {
    PORT: process.argv[2] || 8080,
    MONGO_STORE_URL: process.env.MONGO_STORE_URL,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    ACCOUNT_SID: process.env.ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    PHONE_NUMBER: process.env.PHONE_NUMBER 
}

export default vars;