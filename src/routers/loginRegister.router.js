import { Router } from "express";
import passport from "passport";
import { upload } from "../modules/multer/multer.js";
import * as LoginResterController from "../controllers/loginRegister.controller.js"

const loginRegisterRouter = Router();

// REGISTER



loginRegisterRouter.post('/registrar', upload.single('avatar'), passport.authenticate("register",
    {
        failureRedirect: "/api/errorAlregistrar",
        successRedirect: "/"
    }
));

loginRegisterRouter.get('/errorAlregistrar', (req, res) => {
    res.json({error: "Fail to register"});
});

// LOGIN

loginRegisterRouter.post('/login', passport.authenticate("login",
    {
        failureRedirect: "/api/errorAlLogear",
        successRedirect: "/"
    }
));

loginRegisterRouter.get('/login', (req, res) => {
    const sessionName = req.session.passport ? req.session.passport.user.username : "";
    res.json({sessionName});
});


loginRegisterRouter.get('/errorAlLogear', (req, res) => {
    res.json({error: "Fail to login"});
});

// LOGOUT

loginRegisterRouter.get('/logout', LoginResterController.logout);


export default loginRegisterRouter;