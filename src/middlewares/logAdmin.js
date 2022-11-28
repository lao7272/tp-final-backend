
const isAdmin = (req, res, next) => {
    if(req.query.admin === "true"){
        req.admin = true;
        next();
    } else {
        req.admin = false;
        req.status(403).send(`No eres administrador`);
        
    }
}

module.exports = isAdmin;