const express = require('express');
const { Server: SocketServer } = require('socket.io');
const { Server: HttpServer} = require('http');


const app = express();

const productsApiRouter = require('./routers/productsApiRouter');
const formProductsRouter = require('./routers/formProductsRouter');
const viewProductsRouter = require('./routers/viewProductsRouter');
const chatRouter = require('./routers/chatRouter');




app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));




const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

const productContainer = require('./containers/ProductsContainer');
const prodCont = new productContainer();

const socketProducts = async () => {

    const dbProducts = await prodCont.getAll();
    const dbMessajes = [];

    io.on('connection', (socket) => {
        console.log(`Socket id: ${socket.id}`);
        socket.emit('products', dbProducts);
    
        socket.emit('conversation', dbMessajes);

        socket.on('new-message', (data) => {
        console.log(data);
        dbMessajes.push(data);
        io.sockets.emit('conversation', dbMessajes)
    })
    
    
    });
}
socketProducts();



app.get('/', (req, res) => {
    res.render('pages/index.ejs')
});

app.use('/api/productos', productsApiRouter); 
app.use('/chat', chatRouter)
app.use('/cargar-productos', formProductsRouter); 
app.use('/productos', viewProductsRouter); 
const port = 8080;
httpServer.listen(port, (err) => {
    if (err) throw new Error(`Error en el servidor ${err}`);
    console.log(`RUNNING https://localhost:${port}`);
});

module.exports = io;
