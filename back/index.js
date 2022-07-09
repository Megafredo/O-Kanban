// ~ -------------------------------------------- DOTENV
import 'dotenv/config';

// ~ -------------------------------------------- IMPORTATIONS MODULES
import express from 'express';
const app = express();
import {router} from './app/router/index.js';
import errorAPI from './app/controllers/errorController.js';
import { userMiddleware } from './app/middlewares/auth.js';
import session from 'express-session';

// ~ -------------------------------------------- CORS
app.use((req, res, next) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
    // res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

// ~ -------------------------------------------- JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ~ -------------------------------------------- HELMET
import helmet from 'helmet';
app.use(helmet());


// ~ -------------------------------------------- SESSION
app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 24 * 60 * 60 * 1000 }
        //24 hours
    }
));

//& great mw to keep the user connected !
app.use(userMiddleware);


app.use(router)

//~ Error 404

app.use((req, res) => {
    errorAPI({message: 'Error 404 Page Not Found'}, req, res, 400)
});

//~ Launch Server 
const PORT = process.env.PORT ??  3000; 
 
app.listen(PORT, () => { 
console.log(`🚀\x1b[1;35m Launch server on http://localhost:${PORT}\x1b[0m`); 
});