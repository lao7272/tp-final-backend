import { Router } from "express";

import isAuth from "../middlewares/isAuth.js";

import * as CartController from "../controllers/cart.controller.js"

import { getDate } from "../lib/utils.js";

import Cart from "../daos/cart/CartMongo.daos.js";
import Product from "../daos/product/ProductMongo.daos.js";

const carts = new Cart();
const products = new Product();

const cartRouter = Router();


cartRouter.get('/', isAuth, CartController.getCarts);

cartRouter.get('/:idCart/productos', isAuth, CartController.getCartById);

cartRouter.post('/', isAuth, CartController.createCart);

cartRouter.post('/:idCarrito/productos/:idProductos', isAuth, CartController.addProductToCart);

cartRouter.delete('/:idCarrito', isAuth, CartController.deleteCart);

cartRouter.delete('/:idCarrito/productos/:idProductos', isAuth, CartController.removeProduct  );
export default cartRouter;