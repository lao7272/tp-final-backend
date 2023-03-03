import { logger } from "../modules/logger/logger.js";
import Cart from "../daos/cart/CartMongo.daos.js";
const cart = new Cart();
const getCartsDB = async () => {
    try {
        return await cart.getAll();
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}

const getCartByIdDB = async (id) => {
    try {
        return await cart.getById(id);
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}

const createCartDB = async (object) => {
    try {
        return await cart.save(object);
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}

const updateCartDB = async (id, object) => {
    try {
        return await cart.update(id, object);
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}
const deleteCartDB = async (id) => {
    try {
        return await cart.deleteById(id);
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}

export {
    getCartsDB,
    getCartByIdDB,
    createCartDB,
    updateCartDB,
    deleteCartDB
}