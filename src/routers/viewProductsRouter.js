const { Router } = require("express");
const viewProductsRouter = Router();
const productContainer = require('../containers/ProductsContainer');
const prodCont = new productContainer();

const getProducts = async () => {
    const dbProducts = await prodCont.getAll() ?? [];
    viewProductsRouter.get('/', (req, res) => {
        res.render('pages/showProducts.ejs', {dbProducts})
    });
}
getProducts();



module.exports = viewProductsRouter;