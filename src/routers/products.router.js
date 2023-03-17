import { Router } from "express";

import isAdmin from "../middlewares/logAdmin.js";
import * as BoxController from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get('/', BoxController.getProducts)
.get('/:id', BoxController.getProductById)
.post('/', isAdmin, BoxController.createProduct)
.put('/:id', isAdmin, BoxController.updateProduct)
.delete('/:id', isAdmin, BoxController.deleteProduct);

export default productsRouter;

