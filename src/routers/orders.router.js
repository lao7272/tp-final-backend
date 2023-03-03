import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import * as OrdersController from "../controllers/orders.controller.js"

const ordersRouter = Router();

ordersRouter.post("/", isAuth, OrdersController.cartOrder)

export default ordersRouter;