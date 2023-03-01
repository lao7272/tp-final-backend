import { Router } from "express";
import { getDate } from "../lib/utils.js";
import isAdmin from "../middlewares/logAdmin.js";
import isAuth from "../middlewares/isAuth.js";


import Product from "../daos/product/ProductMongo.js";
const products = new Product();

const productsRouter = Router();



productsRouter.get('/', isAuth, async (req, res) => {
    const dbProducts = await products.getAll();
    const sessionName = req.session.passport ? req.session.passport.user.username : "";
    res.json({dbProducts});
});


productsRouter.get('/:id', async (req, res) => {
    const product = await products.getById(req.params.id);
    if (!product) {
        console.log("ERROR: producto no encontrado")
        res.json({message: 'producto no encontrado'})
    }  
    res.json(product);
});


productsRouter.post('/', isAdmin, async (req, res) => {
    const date = getDate();
    
    const newProduct = { ...req.body, ...date};
    await products.save(newProduct);

    res.json({newProduct});
});



productsRouter.put('/:id', isAdmin, async (req, res) => {
    const findProduct = await products.getById(req.params.id)
    if (findProduct) {
        const productUpdated = {...req.body}
        products.update(req.params.id, productUpdated);
        res.json(productUpdated);
    } else {
        res.json({message: 'El producto no se encontro'})
    }
});



productsRouter.delete('/:id', isAdmin, async (req, res) => {
    const findProduct = await products.getById(req.params.id);
    if (findProduct) {        
        products.deleteById(req.params.id);
        res.json(findProduct);
    } else {
        res.json({message: "El producto ya ha sido eliminado"});
    }
});  

// productsRouter.delete('/', async (req, res) => {
//         products.deleteAllProducts();
//         res.json({message: 'Productos eliminados'});
// });     



export default productsRouter;

