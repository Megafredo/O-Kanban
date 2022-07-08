//~ ----------------------------------------------------------------- IMPORTATION MODULE
import { _500, _403 } from '../controllers/errorController.js';

//~ ----------------------------------------------------------------- AUTH MIDDLEWARE
async function auth(req, res, next) {
    try {
        if (!req.session.user) return res.json('You need to be connected to create a super Kanban !');

        next();
    } catch (err) {
        _500(err, req, res);
    }
}

//~ ----------------------------------------------------------------- ADMIN
async function admin(req, res, next) {
    try {
        if (req.session.user.email === 'admin@admin.com') return res.json('Welcome home Super Admin !');

        if (req.session.user.email !== 'admin@admin.com') return res.json(`You're not super admin, sorry you cannot access the super Kanban yet!`);

        next();
    } catch (err) {
        _500(err, req, res);
    }
}

//~ ----------------------------------------------------------------- USER MIDDLEWARE
async function userMiddleware(req, res, next) {
    try {
        req.session.user ? (res.locals.user = req.session.user) : (res.locals.user = false);

        next();
    } catch (err) {
        _500(err, req, res);
    }
}

export { auth, admin, userMiddleware };
