const express = require('express');
const { Server: SocketServer } = require('socket.io');
const { Server: HttpServer} = require('http');

const createTable = require('../database/createTable');

const mysqlConnection = require('../database/mysqlConnection');
const sqliteConnection = require('../database/sqliteConnection');
const containerSql = require('./containers/SqlContainer');
const productContainerSql = new containerSql(mysqlConnection, 'products');
const chatContainerSql = new containerSql(sqliteConnection, 'messages');

const app = express();

// createTable(); /* crear tablas en la base de datos */

const formProductsRouter = require('./routers/formProductsRouter');
const viewProductsRouter = require('./routers/viewProductsRouter');
const chatRouter = require('./routers/chatRouter');


app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));




const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);


const socketProducts = async () => {

    
    io.on('connection', async (socket) => {
        const dbProducts = await productContainerSql.getAll();
        const dbMessajes = await chatContainerSql.getAll();
        console.log(`Socket id: ${socket.id}`);

        socket.emit('products', dbProducts);
        socket.emit('conversation', dbMessajes);

        socket.on('new-message', async (data) => {
        console.log(data);
        await chatContainerSql.save(data);
        const newDbMessages = await chatContainerSql.getAll()
        io.sockets.emit('conversation', newDbMessages);
    })
    
    
    });
}
socketProducts();



app.get('/', (req, res) => {
    res.render('pages/index.ejs')
});

app.use('/chat', chatRouter);
app.use('/cargar-productos', formProductsRouter); 
app.use('/productos', viewProductsRouter); 

app.all('*', (req, res) => {
    res.render('pages/error.ejs')
})
const port = 8080;
httpServer.listen(port, (err) => {
    if (err) throw new Error(`Error en el servidor ${err}`);
    console.log(`RUNNING https://localhost:${port}`);
});

module.exports = io;
