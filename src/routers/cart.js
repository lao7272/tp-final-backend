const { Router } = require('express');
const cartRouter = Router();
/* FILESYSTEM */
// const cartContainer  = require('../daos/cart/Cart');
// const carts = new cartContainer();
// const productsContainer = require('../daos/product/Product');;
// const products = new productsContainer();
/* MONGODB */
// const cartContainer  = require('../daos/cart/CartMongo');
// const carts = new cartContainer();
// const productsContainer = require('../daos/product/ProductMongo');;
// const products = new productsContainer();
/* FIREBASE */
const cartContainer  = require('../daos/cart/CartFirebase');
const carts = new cartContainer();
const productsContainer = require('../daos/product/ProductFirebase');;
const products = new productsContainer();

const date = require('../lib/utils');


cartRouter.get('/', async (req, res) => {
    const db = await carts.getAllCarts();
    res.json(db);
});

cartRouter.get('/:idCarrito/productos', async (req, res) => {
    const idCarrito = req.params.idCarrito;
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

    res.json({id: idCart});
});

cartRouter.post('/:idCarrito/productos/:idProductos', async (req, res) => {
    
    const idProduct = req.params.idProductos;
    const idCart = req.params.idCarrito;
    const getProduct = await products.getProductById(idProduct);
    const getCart = await carts.getCartById(idCart);

    if (getCart && getProduct) {
        const addProduct = [getProduct, ...getCart.products];
        await carts.updateCart(idCart, {products: addProduct});
        res.json(addProduct);       
    } else {
        res.json({message: `Alguno de los id cargados no exite`});
    }

});

cartRouter.delete('/:idCarrito', async (req, res) => {
    const idCart  = req.params.idCarrito;
    const findCart = await carts.getCartById(idCart);
    if (findCart) {
        carts.deleteCartById(idCart);
        res.json({idCart:`${idCart}`});
    } else {

        res.json({message: `Carrito con id ${idCart} no encontrado`})
    }
});

cartRouter.delete('/:idCarrito/productos/:idProductos', async (req, res) => {
    const idProduct = req.params.idProductos;
    const idCart  = req.params.idCarrito;
    const findCart = await carts.getCartById(idCart);
    const findProduct = await findCart.products.find(product => product._id == idProduct)
    
    if (findCart && findProduct) {
        const newProductArr = findCart.products.filter(product => product._id != idProduct);
        await carts.updateCart(idCart, {products: newProductArr});
        res.json({message: `Producto con id:${idProduct} eliminado`});
    } else {
        res.json({message: `El producto o carrito cargado no exite`})
    }
});
module.exports = cartRouter;