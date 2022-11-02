const express = require('express');
const multer = require('multer');

const port = 8080;

const app = express();

const productsRouter = require('./routers/products');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.use('/api/productos', productsRouter); 

app.listen(port, () => console.log(`RUN https://localhost:${port}`))
