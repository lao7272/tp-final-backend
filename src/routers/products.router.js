import { Router } from "express";

import isAdmin from "../middlewares/logAdmin.js";
import isAuth from "../middlewares/isAuth.js";
import * as BoxController from "../controllers/products.controller.js";


const productsRouter = Router();



productsRouter.get('/', isAuth, BoxController.getProducts);


productsRouter.get('/:id', BoxController.getProductById);


productsRouter.post('/', isAdmin, BoxController.createProduct);



productsRouter.put('/:id', isAdmin, BoxController.updateProduct);



productsRouter.delete('/:id', isAdmin, BoxController.deleteProduct);  
    



export default productsRouter;

