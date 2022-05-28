//~ IMPORTATIONS
import {Router} from 'express';
const router = Router();

//* --------------------------- USER
// Render
router.get('/kanban');
router.get('/profile/');

// inscription - connexion
router.post('/signup');
router.post('/signin');

// Modifier - delete 
router.patch('/profile/:id');
router.delete('/profile/:id');

export { router };