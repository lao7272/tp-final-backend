import express from "express";
import session from 'express-session';

import { logger } from "./modules/logger/logger.js";

import MongoStore from "connect-mongo";

import passport from "passport";
import { passportConfig } from "./modules/passport/passport.js";

import vars from "./config/config.js";

import cluster from 'cluster';
import os from "os";

/* ROUTES */ 

import loginRegisterRouter from "./routers/loginRegisterRouter.js";
import productsRouter from "./routers/productsRouter.js";
import cartRouter from "./routers/cartRouter.js";
import ordersRouter from "./routers/ordersRouter.js";

const { MONGO_STORE_URL, PORT } = vars;

const clusterMode = process.argv[3] === "CLUSTER";

// Forever: forever start server.js 8080 CLUSTER
// PM2: pm2 start server.js --name="Server 1" --watch -i max -- 8080 CLUSTER


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
    
    
    const sessionConfig = session({
        store: MongoStore.create({
            mongoUrl: MONGO_STORE_URL,
            ttl: 600
        }),
        secret: 'shhh',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: 600000
        }
    });
    
    app.use(sessionConfig);
    
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    passportConfig();
    
    
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    //app.set('view engine', 'ejs');
    
    
    
    app.get('/',(req, res) => {
        const sessionName = req.session.passport ? req.session.passport.user.username : "";
        if(!sessionName) {
            return res.json({message: "Welcome"})
        }
        res.json({username: sessionName});
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
