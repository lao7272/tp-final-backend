import { logger } from "../modules/logger/logger.js";
import DAOsFactory from "../daos/DAOsFactory.js";
const Factory = new DAOsFactory('mongo');
const Products = await Factory.getProductDAO();

const getProductsDB = async () => {
    try {
        return await Products.getAll();
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}

const getProductByIdDB = async (id) => {
    try {
        return await Products.getById(id);
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}

const createProductDB = async (object) => {
    try {
        return await Products.save(object);
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}

const updateProductDB = async (id, object) => {
    try {
        return await Products.update(id, object);
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}
const deleteProductDB = async (id) => {
    try {
        return await Products.deleteById(id);
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}

export {
    getProductsDB,
    getProductByIdDB,
    createProductDB,
    updateProductDB,
    deleteProductDB
}