
const isAdmin = (req, res, next) => {
    if(req.body.admin){
        req.admin = true;
        next();
    } else {
        req.admin = false;
        req.status(403).send(`No eres administrador`);
        
    }
}

module.exports = isAdmin;