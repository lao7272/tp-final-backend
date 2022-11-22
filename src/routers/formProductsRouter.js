const { Router } = require("express");
const formProductsRouter = Router();
const productContainer = require('../containers/ProductsContainer');
const prodCont = new productContainer();


const getProducts = async () => {
    const dbProducts = await prodCont.getAll();

    formProductsRouter.get('/', (req, res) => {
        res.render('pages/form.ejs', {dbProducts});
    });
    
    formProductsRouter.post('/', (req, res) => {
        prodCont.save(req.body);
        console.log(dbProducts);
        res.redirect('/cargar-productos');
    });
}
getProducts();



module.exports = formProductsRouter;