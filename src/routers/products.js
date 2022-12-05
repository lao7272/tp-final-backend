const { Router } = require("express");
const productsRouter = Router();

const productContainer = require('../containers/Product');
const products = new productContainer();
const date = require('../lib/utils');
const isAdmin = require('../middlewares/logAdmin');




productsRouter.get('/', async (req, res) => {
    const db = await products.getAllProducts();
    res.json(db);
});


productsRouter.get('/:id', async (req, res) => {
    const product = await products.getProductById(parseInt(req.params.id));
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
    const idProduct = db[db.length - 1];

    res.json({id: idProduct.id});
});



productsRouter.put('/:id', isAdmin, async (req, res) => {
    const findProduct = await products.getProductById(parseInt(req.params.id))
    if (findProduct) {
        const newProduct = {id: findProduct.id, ...req.body, ...date}
        products.updateProduct(newProduct);
        res.json(newProduct);
    } else {
        res.json({message: 'El producto no se encontro'})
    }
});



productsRouter.delete('/:id', isAdmin, async (req, res) => {
    const findProduct = await products.getProductById(parseInt(req.params.id));
    if (findProduct) {        
        products.deleteProductById(parseInt(req.params.id));
        res.json(findProduct);
    } else {
        res.json({message: "El producto ya ha sido eliminado"});
    }
});    



module.exports = productsRouter;

