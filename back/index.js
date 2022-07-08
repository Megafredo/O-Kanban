// ~ -------------------------------------------- DOTENV
import 'dotenv/config';

// ~ -------------------------------------------- IMPORTATIONS MODULES
import express from 'express';
const app = express();
import {router} from './app/router/index.js';
import { _404 } from './app/controllers/errorController.js';
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
app.use(_404);

const PORT = process.env.PORT ?? 3000
app.listen(PORT, ()=>{
    console.log(`Server started on http://localhost:${PORT}`);
});