const { Router } = require("express");
const chatRouter = Router();

chatRouter.get('/', (req, res) => {
    res.render('pages/chat.ejs');
})

module.exports = chatRouter;