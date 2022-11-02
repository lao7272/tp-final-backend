const { Router } = require("express");
const productsRouter = Router();

const db = [
    {
        id: 1,
        title: 'prod1',
        price: 4000,
        thumbnail: 'url1.com'
    },
    {
        id: 2,
        title: 'prod2',
        price: 784,
        thumbnail: 'url2.com'
    }
];

productsRouter.get('/', (req, res) => {
    res.json(db);
});
productsRouter.get('/:id', (req, res) => {
    const product = db.find((product) => product.id === parseInt(req.params.id));
    if (product === undefined) {
        console.log("ERROR: producto no encontrado")
        res.json({error: 'producto no encontrado'})
    } 
    res.json(product);
});

productsRouter.post('/', (req, res) => {
    const newProduct = {id: db.length + 1, ...req.body};
    db.push(newProduct);
    res.json(newProduct);
});

productsRouter.put('/:id', (req, res) => {
    const prodToUpdate = db.findIndex(product => product.id === parseInt(req.params.id));
    
    db.splice(prodToUpdate, 1, req.body);
    res.json(req.body);
});

productsRouter.delete('/:id', (req, res) => {
    const prodToDelete = db.findIndex(product => product.id === parseInt(req.params.id));
    
    const newProducts = db.splice(prodToDelete, 1);
    res.json(newProducts);
});

module.exports = productsRouter;

