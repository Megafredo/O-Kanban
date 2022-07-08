//~ IMPORTATIONS
import { Router } from 'express';
const router = Router();
import { fetchOneUser, createUser, updateUser, deleteUser, signInUser, signOutUser } from "../controllers/userController.js";

import {auth, admin, userMiddleware} from "../middlewares/auth.js"; // Authentification

//* --------------------------- USER

router.get('/users/profile/:id', fetchOneUser); // Render Profil

router.post('/users/signin', signInUser); // Connexion signIn
router.post('/users/signup', createUser); // Inscription signUp

router.get('/users/signout', signOutUser); // Deconnexion signOut

router.patch('/users/profile/:id', updateUser); // Update
router.delete('/users/profile/:id', deleteUser); // Delete

export { router };
