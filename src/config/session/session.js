import session from 'express-session';
import MongoStore from "connect-mongo";

import vars from '../config.js';

const { MONGO_STORE_URL } = vars;

export default session({
    store: MongoStore.create({
        mongoUrl: MONGO_STORE_URL,
        ttl: 600
    }),
    secret: 'shhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    }
});