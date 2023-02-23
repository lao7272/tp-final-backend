
const isAdmin = (req, res, next) => {
    if(req.body.admin){
        req.admin = true;
        next();
    } else {
        req.admin = false;
        res.json({message: 'No eres administrador'});

        
    }
}

export default isAdmin;