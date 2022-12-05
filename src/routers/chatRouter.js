const { Router } = require("express");
const chatRouter = Router();

const sqliteConnection = require('../../database/sqliteConnection');
const sqlContainer = require('../containers/SqlContainer');
const sqlLiteChat = new sqlContainer(sqliteConnection, 'messages');

chatRouter.get('/', async (req, res) => {
    const db = await sqlLiteChat.getAll();
    console.log(db)
    res.render('pages/chat.ejs');
});

chatRouter.post('/', async (req, res) => {
    console.log(req.body)
    await sqlLiteChat.save(req.body);
    
    res.json(req.body);
});

module.exports = chatRouter;