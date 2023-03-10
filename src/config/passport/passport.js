import passport from "passport";
import { Strategy } from "passport-local";

import { hashPassword, isValidPassword } from "../../modules/bcrypt/bcrypt.js";

import { sendVerificationEmail } from "../../modules/nodemailer/nodemailer.js";

import { logger } from "../../modules/logger/logger.js";

import DAOsFactory from "../../daos/DAOsFactory.js";
const Factory = new DAOsFactory();
const User = await Factory.getUserDAO();

const passportConfig = () => {

    /*  REGISTER  */ 

    passport.use('register', new Strategy (
        { passReqToCallback: true }, 
        async (req, username, password, done) => {
            try{
                const { email, tel, age, address } = req.body;
                
                const db = await User.getAll(); 
                const findUser = db.find(obj =>  obj.username === username && obj.email === email );
                const comparedPassword = findUser ?  await isValidPassword(password, findUser.password) : ""; 
                if (findUser && comparedPassword) {
                    return done('Already registered')
                }
            
                const hashedPassword = await hashPassword(password, 10);
                
                const avatarPath = `${req.file.destination}/${req.file.filename}`;
                const user =  {
                    username,
                    age,
                    password: hashedPassword,
                    email,
                    tel, 
                    address,
                    avatar: avatarPath
                };
                
            
                await User.save(user);
                
                const getDb = await User.getAll();
                const getUserWithId = getDb.find(obj =>  obj.email == email && obj.password === hashedPassword && obj.username === username ); 

                const verificationEmail = {
                    email: email,
                    subject: "Nuevo registro",
                    html: `
                        <h3>Datos de usuario</h3>
                        Nombre: ${username}.
                        Edad: ${age}.
                        Telefono: ${tel}.
                        Correo: ${email}.
                        Direccion: ${address}.
                        Avatar: ${avatarPath}.
                        Contraseña: ${password}.                      
                    `
                }
                sendVerificationEmail(verificationEmail);
                return done(null, getUserWithId)
            } catch (err) {

                logger.error(`Passport register: ${err}`)
            }
    
    }));
    
    /*  LOGIN  */ 

    passport.use('login', 
    new Strategy({
        usernameField: "email",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const db =  await User.getAll();
            const findUser = db.find(obj => obj.email === email);
            if (!findUser) {
                return done(null, false)
            }
            
            const comparedPassword = findUser ? await isValidPassword(password, findUser.password) : "";
            
            if (!comparedPassword) {
                return done(null, false)
            }
            
            console.log("LOGIN", email, password)
            return done(null, findUser);
            
        } catch (err) {
            logger.error(`Passport login: ${err}`)
        }
    }));
    
    
    
    
    
    
    // SERIALIZE & DESERIALIZE
    
    passport.serializeUser(function(user, done) {
        const { _id, username, email } = user;
        const newUser = { _id, username, email } 
        done(null, newUser);
    });
    passport.deserializeUser(async function(obj, done) {
        try {
            const user = await User.getById(obj._id);
            if (!user) {
                return done(new Error('User not found'));
            }
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

}

export { passportConfig }