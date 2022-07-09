//~ ----------------------------------------------------------------- IMPORTATION MODULE
import errorAPI from '../controllers/errorController.js';

//~ ----------------------------------------------------------------- AUTH MIDDLEWARE
async function auth(req, res, next) {
    try {
        if (!req.session.user) return errorAPI({message:'You need to be connected to create a super Kanban !'}, req, res, 401);

        next();
    } catch (err) {
        errorAPI(err, req, res, 500);
    }
}

//~ ----------------------------------------------------------------- ADMIN
async function admin(req, res, next) {
    try {
        if (req.session.user.email === 'admin@admin.com') return res.status(200).json('Welcome home Super Admin !');

        if (req.session.user.email !== 'admin@admin.com') return errorAPI({message:`You're not super admin, sorry you cannot access the super Kanban yet!`}, req, res, 403);

        next();
    } catch (err) {
        errorAPI(err, req, res, 500);
    }
}

//~ ----------------------------------------------------------------- USER MIDDLEWARE
async function userMiddleware(req, res, next) {
    try {
        req.session.user ? (res.locals.user = req.session.user) : (res.locals.user = false);

        next();
    } catch (err) {
        errorAPI(err, req, res, 500);
    }
}

export { auth, admin, userMiddleware };
