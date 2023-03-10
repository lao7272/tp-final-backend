import { getDate } from "../lib/utils.js";
import ProductsDTO from "../dto/product.dto.js";

import * as ProductService from "../services/products.service.js"


const getProducts = async (req, res) => {
    const dbProducts = await ProductService.getProductsDB();
    
    res.json({dbProducts});
}
const getProductById = async (req, res) => {
    const product = await ProductService.getProductByIdDB(req.params.id);

    if (!product) return res.json({message: 'Producto no encontrado'}); 
    const productDTO = new ProductsDTO(product)
    res.json({...productDTO});
}
const createProduct = async (req, res) => {
    const date = getDate();
    const newProduct = { ...req.body, ...date };
    await ProductService.createProductDB(newProduct);
    const productDTO = new ProductsDTO(newProduct);
    res.json({...productDTO});
}
const updateProduct = async (req, res) => {
    const findProduct = await ProductService.getProductByIdDB(req.params.id);
    if (!findProduct) return res.json({message: 'El producto no se encontro'});

    const productUpdated = {...req.body}
    ProductService.updateProductDB(req.params.id, productUpdated);
    const productDTO = new ProductsDTO({_id: req.params.id, ...productUpdated});
    res.json({...productDTO});
}
const deleteProduct = async (req, res) => {
    const findProduct = await ProductService.getProductByIdDB(req.params.id);
    if (!findProduct) return res.json({message: "El producto ya ha sido eliminado"});        

    ProductService.deleteProductDB(req.params.id);
    res.json(findProduct);
}

export {
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct,
    deleteProduct
}