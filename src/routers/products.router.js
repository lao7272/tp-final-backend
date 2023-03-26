import { Router } from "express";

import isAdmin from "../middlewares/logAdmin.js";
import * as BoxController from "../controllers/products.controller.js";

import validateProduct from "../middlewares/productJoiValidation.js";

const productsRouter = Router();

productsRouter.get('/', BoxController.getProducts)
.get('/:id', BoxController.getProductById)
.post('/', isAdmin, validateProduct, BoxController.createProduct)
.put('/:id', isAdmin, validateProduct, BoxController.updateProduct)
.delete('/:id', isAdmin, BoxController.deleteProduct);

export default productsRouter;

