import { Router } from "express";
import passport from "passport";
import { upload } from "../modules/multer/multer.js";

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
    res.json({error: "Fail to register"});
});

// LOGOUT

loginRegisterRouter.get('/logout', async (req, res) => {
    const sessionName = req.session.passport ? req.session.passport.user.username : "";
    req.logout(function(err) {
        if (err) { return next(err); }
        res.json({message: `Bye ${sessionName}`});
    });
});


export default loginRegisterRouter;