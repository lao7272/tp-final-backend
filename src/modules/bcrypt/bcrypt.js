import bcrypt from "bcrypt";
import { logger } from "../logger/logger.js";
const hashPassword = async (password, salt) => {
    try {
        return await bcrypt.hash(password, salt);
    } catch (err) {
        logger.error(`Bcrypt error: ${err}`);
    }
}
const isValidPassword = async (password, encryptedPassword) => {
    try {
        return await bcrypt.compare(password, encryptedPassword);        
    } catch (err) {
        logger.error(`Bcrypt error: ${err}`);
    }
}

export {
    hashPassword,
    isValidPassword
}