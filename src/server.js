import app from "./app.js"
import vars from "./config/config.js";

import cluster from 'cluster';
import os from "os";

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
    app.listen(PORT, (err) => {
        if (err) throw new Error(`Error en el servidor ${err}`);
        console.log(`RUNNING http://localhost:${PORT}`);
    });
}
