//~importations modules
import errorAPI from './errorController.js';
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
        if (isNaN(idUser)) return errorAPI({message:`Id doit être un nombre`}, req, res, 400);

        const user = await User.findByPk(idUser);
        if (!user) return errorAPI({message:`L'utilisateur n'existe pas`}, req, res, 400);

        res.status(200).json(user);
    } catch (err) {
        errorAPI(err, req, res, 500);
    }
}

//~------------------------------------------- SIGN IN USER
async function signInUser(req, res) {
    try {
        const { email, password } = req.body;
        console.log("req.body: ", req.body);

        if (!emailValidator.validate(email)) return errorAPI({message:`Email non valide`}, req, res, 401);

        const user = await User.findOne({
            where: { email }
        });
        
        console.log("user: ", user);
        if (!user) return errorAPI({message:`L'utilisateur n'existe pas`}, req, res, 401);

        const validePwd = await bcrypt.compare(password, user.password);
        if (!validePwd) return errorAPI({message:`Email ou mot de passe non valide`}, req, res, 401);

        //& SESSION
        req.session.user = user;
        //delete datavalues password to protect data
        delete user.dataValues.password;

        res.status(200).json(`Bienvenue ${user.firstname} ${user.lastname.toUpperCase()}`);
    } catch (err) {
        errorAPI(err, req, res, 500);
    }
}

//~------------------------------------------- CREATE USER
async function createUser(req, res) {
    try {
        let { firstname, lastname, email, password, passwordConfirm } = req.body;
        console.log("req.body: ", req.body);

        const user = await User.findOne({ where: { email } });

        // Les vérifications

        if (firstname === undefined) return errorAPI({message:`Merci de renseigner un "Prénom"`}, req, res, 401);
        if (lastname === undefined) return errorAPI({message:`Merci de renseigner un "Nom"`}, req, res, 401);

        if (user) return _401(`L'email existe déjà`);
        if (!emailValidator.validate(email)) return errorAPI({message:`Email non valide`}, req, res, 401);
        if (!schema.validate(password)) return errorAPI({message:`Le mot de passe ne remplis pas les contraintes sécurités`}, req, res, 401);
        if (password !== passwordConfirm) return errorAPI({message:`Les mots de passe ne sont pas identiques`}, req, res, 401);

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
        errorAPI(err, req, res, 500);
    }
}

//~------------------------------------------- UPDATE USER
async function updateUser(req, res) {
    try {
        const idUser = +req.params.id;
        if (isNaN(idUser)) return errorAPI({message:`Id doit être un nombre`}, req, res, 400);

        const user = await User.findByPk(idUser);
        if (!user) return errorAPI({message:`L'utilisateur n'existe pas`}, req, res, 400);

        let { firstname, lastname, email, password, passwordConfirm } = req.body;

        if (password !== passwordConfirm) return errorAPI({message:`Les mots de passe ne sont pas identiques`}, req, res, 401);
        if (!emailValidator.validate(email)) return errorAPI({message:`Email non valide`}, req, res, 401);
        if (!schema.validate(password)) return errorAPI({message:`Le mot de passe ne remplis pas les contraintes sécurités`}, req, res, 401);

        firstname === undefined ? (firstname = user.firstname) : firstname;
        lastname === undefined ? (lastname = user.lastname) : lastname;

        const salt = await bcrypt.genSalt(10);
        password === undefined ? (password = user.password) : (password = await bcrypt.hash(password, salt));

        email === undefined ? (email = user.email) : email;

        await User.update({ firstname, lastname, email, password }, { where: { id: idUser }});

        res.status(200).json(`Vos informations ont bien été mis à jour !`);

    } catch (err) {
        errorAPI(err, req, res, 500);
    }
}

//~------------------------------------------- DELETE USER
async function deleteUser(req, res) {
    try {

        const idUser = +req.params.id
        if(isNaN(idUser)) return errorAPI({message:`Id doit être un nombre`}, req, res, 400);

        const user = await User.findOne({where: {id:idUser}})
        if (!user) return errorAPI({message:`L'utilisateur n'existe pas`}, req, res, 400);

        await User.destroy({where:{id: idUser}});

        res.status(200).json('Utilisateur à bien été supprimé !')


    } catch (err) {
        errorAPI(err, req, res, 500);
    }
}


//~------------------------------------------- SIGN OUT USER
async function signOutUser(req, res) {
    try {

        req.session.user ? res.status(200).json(`L'utilisateur [ ${req.session.user.firstname} ${req.session.user.lastname} ] à bien été déconnecté`) : errorAPI(`Aucun utilisateur n'a été authentifié`,req, res, 400);
        req.session.destroy();

    } catch (err) {
        errorAPI(err, req, res, 500);
    }
}

export { fetchOneUser, signInUser, createUser, updateUser, deleteUser, signOutUser };
