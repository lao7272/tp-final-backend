import { getDate } from "../lib/utils.js";

import * as ProductService from "../services/products.service.js"


const getProducts = async (req, res) => {
    const dbProducts = await ProductService.getProductsDB();
    
    res.json({dbProducts});
}
const getProductById = async (req, res) => {
    const product = await ProductService.getProductByIdDB(req.params.id);
    if (!product) {
        res.json({message: 'Producto no encontrado'})
    }  
    res.json(product);
}
const createProduct = async (req, res) => {
    const date = getDate();
    const newProduct = { ...req.body, ...date};
    await ProductService.createProductDB(newProduct);
    res.json({newProduct});
}
const updateProduct = async (req, res) => {
    const findProduct = await ProductService.getProductByIdDB(req.params.id);
    if (findProduct) {
        const productUpdated = {...req.body}
        ProductService.updateProductDB(req.params.id, productUpdated);
        res.json(productUpdated);
    } else {
        res.json({message: 'El producto no se encontro'})
    }
}
const deleteProduct = async (req, res) => {
    const findProduct = await ProductService.getProductByIdDB(req.params.id);
    if (findProduct) {        
        ProductService.deleteProductDB(req.params.id);
        res.json(findProduct);
    } else {
        res.json({message: "El producto ya ha sido eliminado"});
    }
}

export {
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct,
    deleteProduct
}