const express = require('express');
const multer = require('multer');

const port = 8080;

const app = express();

const productsRouter = require('./routers/products');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.use('/api/productos', productsRouter); 

app.listen(port, (err) => {
    if (err) throw new Error(`Error en el servidor ${err}`);
    console.log(`RUNNING https://localhost:${port}`);
});
