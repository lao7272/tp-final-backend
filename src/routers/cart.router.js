import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import * as CartController from "../controllers/cart.controller.js"

const cartRouter = Router();

cartRouter.get('/', isAuth, CartController.getCarts)
.get('/:idCart', isAuth, CartController.getCartById)
.post('/', isAuth, CartController.createCart)
.post('/:idCarrito/productos/:idProductos', isAuth, CartController.addProductToCart)
.delete('/:idCarrito', isAuth, CartController.deleteCart)
.delete('/:idCarrito/productos/:idProductos', isAuth, CartController.removeProduct  );

export default cartRouter;