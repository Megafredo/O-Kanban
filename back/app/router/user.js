//~ IMPORTATIONS
import { Router } from 'express';
const router = Router();
import { fetchOneUser, createUser, updateUser, deleteUser, signInUser } from "../controllers/userController.js"

//* --------------------------- USER

router.post('/users/profile', signInUser); // Connexion signIn
router.get('/users/profile/:id', fetchOneUser); // Render Profil

router.post('/users/profile', createUser); // Inscription signUp

router.patch('/users/profile/:id', updateUser); // Update
router.delete('/users/profile/:id', deleteUser); // Delete

export { router };
