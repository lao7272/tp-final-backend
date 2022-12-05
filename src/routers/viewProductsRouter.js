const { Router } = require("express");
const viewProductsRouter = Router();
const mysqlConnection = require('../../database/mysqlConnection')
// const productContainer = require('../containers/ProductsContainer');
// const prodCont = new productContainer();
const containerSql = require('../containers/SqlContainer')
const productContainerSql = new containerSql(mysqlConnection, 'products')


viewProductsRouter.get('/', async (req, res) => {
    const dbProducts = await productContainerSql.getAll() ?? [];
    res.render('pages/showProducts.ejs', {dbProducts})
});




module.exports = viewProductsRouter;