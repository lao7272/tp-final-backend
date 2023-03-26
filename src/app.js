import express from "express";
import session from "./config/session/session.js";

import { logger } from "./modules/logger/logger.js";

import passport from "passport";
import { passportConfig } from "./config/passport/passport.js";
import cors from "cors"


/* ROUTES */ 

import loginRegisterRouter from "./routers/loginRegister.router.js";
import productsRouter from "./routers/products.router.js";
import cartRouter from "./routers/cart.router.js";
import ordersRouter from "./routers/orders.router.js";
const app = express();


app.use(session);
app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}));

passportConfig();

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');



app.get('/',(req, res) => {
    const sessionName = req.session.passport ? req.session.passport.user.username : "";
    if(!sessionName) {
        return res.json({message: "Welcome"})
    }
    res.json({message: `Welcome ${sessionName}`});
});
app.use('/api/carrito', cartRouter);
app.use('/api', loginRegisterRouter);
app.use('/api/productos', productsRouter); 
app.use("/api/orders", ordersRouter);
app.all('*', (req, res) => {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    logger.warn(`Pagina no encontrada:  URL: ${fullUrl}, METODO: ${req.method}`);
    res.json({message: 'Page Not Found'});
});

export default app;