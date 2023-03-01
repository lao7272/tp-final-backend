import { Router } from "express";

import isAuth from "../middlewares/isAuth.js";

import { getDate } from "../lib/utils.js";

import Cart from "../daos/cart/CartMongo.js";
import Product from "../daos/product/ProductMongo.js";

const carts = new Cart();
const products = new Product();

const cartRouter = Router();




cartRouter.get('/', isAuth, async (req, res) => {
    try {
        const db = await carts.getAll();
        const sessionName = req.session.passport ? req.session.passport.user.username : "";

        const idUser = req.session.passport ? req.session.passport.user.email : "";
        const findCart = db.find(cart => cart.idUser == idUser);
        
        
        res.json({findCart, sessionName});
    } catch (err) {
        console.error(err)
    }
});

cartRouter.get('/:idCart/productos', isAuth, async (req, res) => {
    const idCart = req.params.idCart;

    const db = await carts.getById(idCart);
    if(!db){
        res.json({message: `El carrito con id: ${idCart} no existe`})
    }
    res.json(db);
});

cartRouter.post('/', isAuth, async (req, res) => {
    const date = getDate();
    
    const idUser = req.session.passport ? req.session.passport.user.email : "";
    const newCart = {...date, products:[], idUser: idUser};
    await carts.save(newCart);
    const db = await carts.getAll();
    const idCart = db[db.length - 1];

    res.json({id: idCart});
});

cartRouter.post('/:idCarrito/productos/:idProductos', isAuth, async (req, res) => {
    
    const idProduct = req.params.idProductos;
    const idCart = req.params.idCarrito;
    const getProduct = await products.getById(idProduct);
    const getCart = await carts.getById(idCart);
    if (getCart && getProduct) {
        const addProduct = [getProduct, ...getCart.products];
        await carts.update(idCart, {products: addProduct});
        res.json(addProduct);       
    } else {
        res.json({message: `Alguno de los id cargados no exite`});
    }

});

cartRouter.delete('/:idCarrito', isAuth, async (req, res) => {
    const idCart  = req.params.idCarrito;
    const findCart = await carts.getById(idCart);
    if (findCart) {
        carts.deleteCartById(idCart);
        res.json({idCart:`${idCart}`});
    } else {

        res.json({message: `Carrito con id ${idCart} no encontrado`})
    }
});

cartRouter.delete('/:idCarrito/productos/:idProductos', isAuth, async (req, res) => {
    const idProduct = req.params.idProductos;
    const idCart  = req.params.idCarrito;
    const findCart = await carts.getById(idCart);
    const findProduct = await findCart.products.find(product => product._id == idProduct)
    
    if (findCart && findProduct) {
        const newProductArr = findCart.products.filter(product => product._id != idProduct);
        await carts.update(idCart, {products: newProductArr});
        res.json({message: `Producto con id:${idProduct} eliminado`});
    } else {
        res.json({message: `El producto o carrito cargado no exite`})
    }
});
export default cartRouter;