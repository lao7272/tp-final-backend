const { Router } = require("express");
const productsRouter = Router();

const productContainer = require('../containers/Product');
const products = new productContainer();
const date = require('../lib/utils');
const isAdmin = require('../middlewares/logAdmin');

const getDb = async () => {
    const db = await products.getAll() ?? [];

    productsRouter.get('/',(req, res) => {
        res.json(db);
    });


    productsRouter.get('/:id', (req, res) => {
        const product = db.find((product) => product.id === parseInt(req.params.id));
        if (product === undefined) {
            console.log("ERROR: producto no encontrado")
            res.json({error: 'producto no encontrado'})
        } 
        res.json(product);
    });


    
    productsRouter.post('/', isAdmin,(req, res) => {
        const newProduct = {id: db.length + 1, ...req.body, ...date};
        products.save(newProduct);
        res.json(newProduct);
    });


    
    productsRouter.put('/:id', isAdmin, (req, res) => {
        
        const indexCart = db.findIndex(product => product.id === parseInt(req.params.id));
        const idProduct = db[indexCart].id;
        const newProduct = {idProduct, ...req.body, ...date}
        products.update(newProduct);
        db.splice(prodToUpdate, 1, {...req.body, ...date});
        res.json(req.body);
    });
    


    productsRouter.delete('/:id', isAdmin,(req, res) => {
        const prodToDelete = db.findIndex(product => product.id === parseInt(req.params.id));
        products.deleteById(parseInt(req.params.id));
        const newProducts = db.splice(prodToDelete, 1);
        res.json(newProducts);
    });    
}

getDb();

module.exports = productsRouter;

