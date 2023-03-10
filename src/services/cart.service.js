import { logger } from "../modules/logger/logger.js";
import DAOsFactory from "../daos/DAOsFactory.js";
const Factory = new DAOsFactory('mongo');
const Cart = await Factory.getCartDAO();

const getCartsDB = async () => {
    try {
        return await Cart.getAll();
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}

const getCartByIdDB = async (id) => {
    try {
        return await Cart.getById(id);
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}

const createCartDB = async (object) => {
    try {
        return await Cart.save(object);
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}

const updateCartDB = async (id, object) => {
    try {
        return await Cart.update(id, object);
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}
const deleteCartDB = async (id) => {
    try {
        return await Cart.deleteById(id);
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