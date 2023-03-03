import { getDate } from "../lib/utils.js";

import * as CartService from "../services/cart.service.js";

import * as ProductService from "../services/products.service.js";


const getCarts = async (req, res) => {
    const db = await CartService.getCartsDB();    
    res.json(db);
    
}

const getCartById =  async (req, res) => {
    const idCart = req.params.idCart;

    const cart = await CartService.getCartByIdDB(idCart);
    if(!cart){
        return res.json({message: `El carrito con id: ${idCart} no existe`})
    }
    res.json(cart);
}

const createCart = async (req, res) => {
    const date = getDate();
    
    const idUser = req.session.passport ? req.session.passport.user.email : "";

    const newCart = {...date, products:[], idUser: idUser};
    await CartService.createCartDB(newCart);
    const db = await CartService.getCartsDB();
    const idCart = db[db.length - 1];

    res.json({id: idCart});
}

const addProductToCart = async (req, res) => {
    
    const productId = req.params.idProductos;
    const cartId = req.params.idCarrito;

    const getProduct = await ProductService.getProductByIdDB(productId);
    const getCart = await CartService.getCartByIdDB(cartId);
    if (!getCart && !getProduct) {
        return res.json({message: `Alguno de los id cargados no exite`});
    } 
    const addProduct = [getProduct, ...getCart.products];
    await CartService.updateCartDB(idCart, {products: addProduct});
    res.json(addProduct);  

}

const deleteCart = async (req, res) => {
    const idCart  = req.params.idCarrito;
    const findCart = await carts.getById(idCart);
    if (findCart) {
        carts.deleteCartById(idCart);
        res.json({idCart:`${idCart}`});
    } else {

        res.json({message: `Carrito con id ${idCart} no encontrado`})
    }
}

const removeProduct = async (req, res) => {
    const productId = req.params.idProductos;
    const cartId  = req.params.idCarrito;
    const findCart = await CartService.getCartByIdDB(cartId);
    const findProduct = await findCart.products.find(product => product._id == productId)
    
    if (!findCart && !findProduct) {
        return res.json({message: `El producto o carrito cargado no exite`})
    } 

    const newProductArr = findCart.products.filter(product => product._id != productId);
    await CartService.updateCartDB(cartId, {products: newProductArr});
    res.json({message: `Producto con id:${productId} eliminado`});
}
export {
    getCarts, 
    getCartById, 
    createCart, 
    addProductToCart,
    deleteCart,
    removeProduct
}