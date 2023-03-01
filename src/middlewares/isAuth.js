const isAuth = (req, res, next) => {
    if (req.isAuthenticated()){
        next();
    } else {
        res.redirect("/api/login");
    }
}
export default isAuth;