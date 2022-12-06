const { Router } = require("express");
const chatRouter = Router();

chatRouter.get('/', async (req, res) => {
    res.render('pages/chat.ejs');
});



module.exports = chatRouter;