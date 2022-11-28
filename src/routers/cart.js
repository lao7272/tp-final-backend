const { Router } = require('express');
const cartRouter = Router();

const cartContainer  = require('../containers/Cart');
const carts = new cartContainer();
const productsContainer = require('../containers/Product');;
const products = new productsContainer();
const date = require('../lib/utils');

const getDb = async () => {
    let db = await carts.getAll() ?? [];


    cartRouter.get('/:idCarrito/productos', async (req, res) => {
        const idCarrito = parseInt(req.params.idCarrito);
        const getCart = await carts.getById(idCarrito);

        res.json(getCart);
    });
    
    cartRouter.post('/', (req, res) => {
        const newCart = {id: db.length + 1, ...date, products:[]};
        carts.save(newCart);
        res.json(newCart)
    });
    
    cartRouter.post('/:idCarrito/productos/:idProductos', async (req, res) => {
        
        const idProduct = parseInt(req.params.idProductos);
        const idCart  = parseInt(req.params.idCarrito);
        const getProduct = await products.getById(idProduct);
        const getCart = await carts.getById(idCart);

        getCart.products.push(getProduct);
        console.log(getCart)
        carts.update(getCart);
        res.json(getCart);       

    });
    
    cartRouter.delete('/:idCarrito', (req, res) => {
        const idCart  = parseInt(req.params.idCarrito);
        carts.deleteById(idCart);
        res.json(idCart)
    });
    
    cartRouter.delete('/:idCarrito/productos/:idProductos', (req, res) => {
        const idProduct = parseInt(req.params.idProductos);
        const idCart  = parseInt(req.params.idCarrito);
        carts.deleteProductById(idCart,idProduct);
        res.json({message: `Tu producto con id:${idProduct}`})

    });
}
getDb();
module.exports = cartRouter;