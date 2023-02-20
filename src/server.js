const express = require('express')


const app = express();


const productsRouter = require('./routers/products');
const cartRouter = require('./routers/cart');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));



app.use('/api/productos', productsRouter); 
app.use('/api/carrito', cartRouter);
app.all('*', (req, res) => {
    res.json({message: 'PAGE NOT FOUND'});
})


const PORT = process.env.PORT  || 8080;
app.listen(PORT, (err) => {
    if (err) throw new Error(`Error en el servidor ${err}`);
    console.log(`RUNNING https://localhost:${PORT}`);
});
