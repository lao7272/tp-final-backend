import express from "express";
import session from "./config/session/session.js";

import { logger } from "./modules/logger/logger.js";

import passport from "passport";
import { passportConfig } from "./config/passport/passport.js";

import vars from "./config/config.js";

import cluster from 'cluster';
import os from "os";

/* ROUTES */ 

import loginRegisterRouter from "./routers/loginRegister.router.js";
import productsRouter from "./routers/products.router.js";
import cartRouter from "./routers/cart.router.js";
import ordersRouter from "./routers/orders.router.js";

const { PORT } = vars;

const clusterMode = process.argv[3] === "CLUSTER";

if (clusterMode && cluster.isPrimary) {
    const numCPUs = os.cpus().length
    console.log(`PID MASTER ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {    
    const app = express();
    
    
    app.use(session);
    
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
    
    
    
    app.listen(PORT, (err) => {
        if (err) throw new Error(`Error en el servidor ${err}`);
        console.log(`RUNNING http://localhost:${PORT}`);
    });
}
