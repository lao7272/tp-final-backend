const { Router } = require("express");
const productsRouter = Router();

/* FILE SYSTEM */
// const productContainer = require('../daos/product/Product');
/* MONGODB */
// const productContainer = require('../daos/product/ProductMongo');
/* FIREBASE */
const productContainer = require('../daos/product/ProductFirebase');
const products = new productContainer();
const date = require('../lib/utils');
const isAdmin = require('../middlewares/logAdmin');




productsRouter.get('/', async (req, res) => {
    const db = await products.getAllProducts();
    res.json(db);
});


productsRouter.get('/:id', async (req, res) => {
    const product = await products.getProductById(req.params.id);
    if (!product) {
        console.log("ERROR: producto no encontrado")
        res.json({message: 'producto no encontrado'})
    }  
    res.json(product);
});



productsRouter.post('/', isAdmin, async (req, res) => {
    const newProduct = { ...req.body, ...date};
    await products.saveProduct(newProduct);
    const db = await products.getAllProducts();

    res.json({db});
});



productsRouter.put('/:id', isAdmin, async (req, res) => {
    const findProduct = await products.getProductById(req.params.id)
    if (findProduct) {
        const productUpdated = {...req.body}
        products.updateProduct(req.params.id, productUpdated);
        res.json(productUpdated);
    } else {
        res.json({message: 'El producto no se encontro'})
    }
});



productsRouter.delete('/:id', isAdmin, async (req, res) => {
    const findProduct = await products.getProductById(req.params.id);
    if (findProduct) {        
        products.deleteProductById(req.params.id);
        res.json(findProduct);
    } else {
        res.json({message: "El producto ya ha sido eliminado"});
    }
});  

// productsRouter.delete('/', async (req, res) => {
//         products.deleteAllProducts();
//         res.json({message: 'Productos eliminados'});
// });     



module.exports = productsRouter;

