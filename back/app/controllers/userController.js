//~importations modules
import { _400, _401, _403, _404, _500 } from './errorController.js';
import { User } from '../models/index.js';

import bcrypt from 'bcrypt';
import emailValidator from 'email-validator';
import passwordValidator from 'password-validator';
const schema = new passwordValidator(); // Blacklist these values

//Add properties
/* schema.is().min(6) // Minimum length 6
 .is().max(100) // Maximum length 100
.has().uppercase(1) // Must have uppercase letters
.has().lowercase(1) // Must have lowercase letters
.has().digits(2) // Must have at least 2 digits
.has().symbols(1) // Must have at least 1 symbol
.has().not().spaces() // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']) */
//~------------------------------------------- FETCH ONE USER
async function fetchOneUser(req, res) {
    try {
        const idUser = +req.params.id;
        if (isNaN(idUser)) return _400({message:`Id doit être un nombre`}, req, res,);

        const user = await User.findByPk(idUser);
        if (!user) return _400({message:`L'utilisateur n'existe pas`}, req, res);

        res.status(200).json(user);
    } catch (err) {
        _500(err, req, res);
    }
}

//~------------------------------------------- SIGN IN USER
async function signInUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!emailValidator.validate(email)) return _401({message:`Email non valide`}, req, res);

        const user = await User.findOne({
            where: { email }
        });
        if (!user) return _400({message:`L'utilisateur n'existe pas`}, req, res);

        const validePwd = await bcrypt.compare(password, user.password);
        if (!validePwd) return _401({message:`Email ou mot de passe non valide`}, req, res);

    
        //&------------------- SESSION
        req.session.user = user;
        //delete datavalues password to protect data
        delete user.dataValues.password;
        //&------------------- SESSION

        res.status(200).json(`Bienvenue ${user.firstname} ${user.lastname.toUpperCase()}`);
    } catch (err) {
        _500(err, req, res);
    }
}

//~------------------------------------------- CREATE USER
async function createUser(req, res) {
    try {
        let { firstname, lastname, email, password, passwordConfirm } = req.body;

        const user = await User.findOne({ where: { email } });

        // Les vérifications

        if (firstname === undefined) return _401({message:`Merci de renseigner un "Prénom"`}, req, res);
        if (lastname === undefined) return _401({message:`Merci de renseigner un "Nom"`}, req, res);

        if (user) return _401(`L'email existe déjà`);
        if (!emailValidator.validate(email)) return _401({message:`Email non valide`}, req, res);
        if (!schema.validate(password)) return _401({message:`Le mot de passe ne remplis pas les contraintes sécurités`}, req, res);
        if (password !== passwordConfirm) return _401({message:`Les mots de passe ne sont pas identiques`}, req, res);

        // Une fois toute les sécurités passé alors on crée l'utilisateur
        // Dans un premier temps on Hash le password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        // Création de l'utilisateur
        await User.create({
            ...req.body,
            password
        });

        res.status(201).json(`L'utilisateur ${firstname} ${lastname}, à bien été crée !`);
    } catch (err) {
        _500(err, req, res);
    }
}

//~------------------------------------------- UPDATE USER
async function updateUser(req, res) {
    try {
        const idUser = +req.params.id;
        if (isNaN(idUser)) return _400({message:`Id doit être un nombre`}, req, res);

        const user = await User.findByPk(idUser);
        if (!user) return _400({message:`L'utilisateur n'existe pas`}, req, res);

        let { firstname, lastname, email, password, passwordConfirm } = req.body;

        if (password !== passwordConfirm) return _401({message:`Les mots de passe ne sont pas identiques`}, req, res);
        if (!emailValidator.validate(email)) return _401({message:`Email non valide`}, req, res);
        if (!schema.validate(password)) return _401({message:`Le mot de passe ne remplis pas les contraintes sécurités`}, req, res);

        firstname === undefined ? (firstname = user.firstname) : firstname;
        lastname === undefined ? (lastname = user.lastname) : lastname;

        const salt = await bcrypt.genSalt(10);
        password === undefined ? (password = user.password) : (password = await bcrypt.hash(password, salt));

        email === undefined ? (email = user.email) : email;

        await User.update({ firstname, lastname, email, password }, { where: { id: idUser }});

        res.status(200).json(`Vos informations ont bien été mis à jour !`);

    } catch (err) {
        _500(err, req, res);
    }
}

//~------------------------------------------- DELETE USER
async function deleteUser(req, res) {
    try {

        const idUser = +req.params.id
        if(isNaN(idUser)) return _400({message:`Id doit être un nombre`}, req, res);

        const user = await User.findOne({where: {id:idUser}})
        if (!user) return _401({message:`L'utilisateur n'existe pas`}, req, res);

        await User.destroy({where:{id: idUser}});

        res.status(200).json('Utilisateur à bien été supprimé !')


    } catch (err) {
        _500(err, req, res);
    }
}


//~------------------------------------------- SIGN OUT USER
async function signOutUser(req, res) {
    try {

        req.session.user ? res.status(200).json(`L'utilisateur [ ${req.session.user.firstname} ${req.session.user.lastname} ] à bien été déconnecté`) : res.status(400).json(`Aucun utilisateur n'a été authentifié`);
        req.session.destroy();

    } catch (err) {
        _500(err, req, res);
    }
}

export { fetchOneUser, signInUser, createUser, updateUser, deleteUser, signOutUser };
