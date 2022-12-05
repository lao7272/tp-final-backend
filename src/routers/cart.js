const { Router } = require('express');
const cartRouter = Router();

const cartContainer  = require('../containers/Cart');
const carts = new cartContainer();
const productsContainer = require('../containers/Product');;
const products = new productsContainer();
const date = require('../lib/utils');




cartRouter.get('/:idCarrito/productos', async (req, res) => {
    const idCarrito = parseInt(req.params.idCarrito);
    const db = await carts.getCartById(idCarrito);
    if(!db){
        res.json({message: `El carrito con id: ${idCarrito} no existe`})
    }
    res.json(db);
});

cartRouter.post('/', async (req, res) => {
    const newCart = {...date, products:[]};
    await carts.saveCart(newCart);
    const db = await carts.getAllCarts();
    const idCart = db[db.length - 1];

    res.json({id: idCart.id});
});

cartRouter.post('/:idCarrito/productos/:idProductos', async (req, res) => {
    
    const idProduct = parseInt(req.params.idProductos);
    const idCart  = parseInt(req.params.idCarrito);
    const getProduct = await products.getProductById(idProduct);
    const getCart = await carts.getCartById(idCart);

    if (getCart && getProduct) {
        getProduct.id = Math.floor(Math.random() * 999999); /* Asigno un nuevo id para evitar errores(se que se puede repetir) */ 
        getCart.products.push(getProduct);
        carts.updateCart(getCart);
        res.json(getCart);       
    } else {
        res.json({message: `Alguno de los id cargados no exite`});
    }

});

cartRouter.delete('/:idCarrito', async (req, res) => {
    const idCart  = parseInt(req.params.idCarrito);
    const findCart = await carts.getCartById(idCart);
    if (findCart) {
        carts.deleteCartById(idCart);
        res.json({idCart:`${idCart}`});
    } else {

        res.json({message: `Carrito con id ${idCart} no encontrado`})
    }
});

cartRouter.delete('/:idCarrito/productos/:idProductos', async (req, res) => {
    const idProduct = parseInt(req.params.idProductos);
    const idCart  = parseInt(req.params.idCarrito);
    const findCart = await carts.getCartById(idCart);
    
    const findProduct = findCart.products.find(product => product.id === idProduct);
    if (findCart && findProduct) {
        carts.deleteProductById(idCart, idProduct);
        res.json({message: `Producto con id:${idProduct} eliminado`});
    } else {
        res.json({message: `El producto o carrito cargado no exite`})
    }
});
module.exports = cartRouter;