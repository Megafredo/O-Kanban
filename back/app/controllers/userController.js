//~importations modules
import _404, { _500 } from './errorController.js';
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
        if (isNaN(idUser)) return res.json(`Id doit être un nombre`);

        const user = await User.findByPk(idUser);
        if (!user) return res.json(`L'utilisateur n'existe pas`);

        res.status(200).json(user);
    } catch (err) {
        _500(err, req, res);
    }
}

//~------------------------------------------- SIGN IN USER
async function signInUser(req, res) {
    try {

        const { email, password } = req.body;
        if (!emailValidator.validate(email)) return res.json(`Email non valide`);

        const user = await User.findOne({
            where: { email }
        });
        if (!user) return res.json(`L'utilisateur n'existe pas`);

        const validePwd = await bcrypt.compare(password, user.password);
        if (!validePwd) return res.json(`Email ou mot de passe non valide`);

        res.status(200).json(`Bienvenue ${user.firstname} ${user.lastname.toUpperCase()}`);


    } catch (err) {
        _500(err, req, res);
    }
}

//~------------------------------------------- CREATE USER
async function createUser(req, res) {
    try {



    } catch (err) {
        _500(err, req, res);
    }
}

//~------------------------------------------- UPDATE USER
async function updateUser(req, res) {
    try {
    } catch (err) {
        _500(err, req, res);
    }
}

//~------------------------------------------- DELETE USER
async function deleteUser(req, res) {
    try {
    } catch (err) {
        _500(err, req, res);
    }
}

export { fetchOneUser, signInUser, createUser, updateUser, deleteUser };
