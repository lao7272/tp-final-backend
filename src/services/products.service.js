import { logger } from "../modules/logger/logger.js";
import Product from "../daos/product/ProductMongo.daos.js";
const products = new Product();

const getProductsDB = async () => {
    try {
        return await products.getAll();
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}

const getProductByIdDB = async (id) => {
    try {
        return await products.getById(id);
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}

const createProductDB = async (object) => {
    try {
        return await products.save(object);
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}

const updateProductDB = async (id, object) => {
    try {
        return await products.update(id, object);
    } catch (err) {
        logger.error(`Service error: ${err}`);
    }
}
const deleteProductDB = async (id) => {
    try {
        return await products.deleteById(id);
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