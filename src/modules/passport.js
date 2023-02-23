import passport from "passport";
import { Strategy } from "passport-local";
import User from "../daos/users/UsersMongoDB.js"
const DBUsers = new User();

import bcrypt from "bcrypt";

passport.use('register', new Strategy (
    { passReqToCallback: true }, 
    async (req, username, password, done) => {
    const { email } = req.body;
    
    const db = await DBUsers.getAllUser();
    const findUser = db.find(obj =>  obj.username === username && obj.email === email );
    const comparedPassword = findUser ?  await bcrypt.compare(password, findUser.password) : "";
    if (findUser && comparedPassword) {
        return done('Already registered')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user =  {
        username,
        password: hashedPassword,
        email
    };

    await DBUsers.saveUser(user);
    
    const getDb = await DBUsers.getAllUser()
    const getUserWithId = getDb.find(obj =>  obj.email == email && obj.password === hashedPassword && obj.username === username ); 

    return done(null, getUserWithId)

}));

passport.use('login', 
new Strategy({
    usernameField: "email",
    passReqToCallback: true
}, async (req, email, password, done) => {
    const db =  await DBUsers.getAllUser();
    const findUser = db.find(obj => obj.email === email);
    
    if (!findUser) {
        return done(null, false)
    }

    const comparedPassword = findUser ? await bcrypt.compare(password, findUser.password) : "";

    if (!comparedPassword) {
        return done(null, false)
    }


    return done(null, findUser)
}));

// SERIALIZE & DESERIALIZE

passport.serializeUser(function(user, done) {
    const { _id, username } = user;
    const newUser = { _id, username } 
    done(null, newUser);
});
passport.deserializeUser(async function(obj, done) {
    
    const user = await DBUsers.getUserById(obj._id);
    done(null, user);
});