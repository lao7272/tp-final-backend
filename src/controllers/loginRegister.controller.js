


const logout = (req, res) => {
    const sessionName = req.session.passport ? req.session.passport.user.username : "";
    req.logout(function(err) {
        if (err) { return next(err); }
        res.json({message: `Bye ${sessionName}`});
    });
}

export {
    logout
}