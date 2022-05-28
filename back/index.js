// ~ -------------------------------------------- DOTENV
import 'dotenv/config';

// ~ -------------------------------------------- IMPORTATIONS MODULES
import express from 'express';
const app = express();
import {router} from './app/router/index.js';
 
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

import myError, { _400, _401 ,_403, _500 } from './app/controllers/errorController.js';

app.use(router)
app.use(myError);

const PORT = process.env.PORT ?? 3000
app.listen(PORT, ()=>{
    console.log(`Server started on http://localhost:${PORT}`);
});