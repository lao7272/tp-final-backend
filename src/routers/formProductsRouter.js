const { Router } = require("express");
const formProductsRouter = Router();

const mysqlConnection = require('../../database/mysqlConnection');
const containerSql = require('../containers/SqlContainer');
const productContainerSql = new containerSql(mysqlConnection, 'products');

    formProductsRouter.get('/', async (req, res) => {
        const dbProducts = await productContainerSql.getAll() ?? [];
        res.render('pages/form.ejs', {dbProducts});
    });
    
    formProductsRouter.post('/', async (req, res) => {
        await productContainerSql.save(req.body);
        res.redirect('/cargar-productos');
    });




module.exports = formProductsRouter;