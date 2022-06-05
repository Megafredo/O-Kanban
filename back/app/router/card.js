//~ IMPORTATIONS
import { Router } from 'express';
import { fetchAllCards, createCard, fetchOneCard, updateCard, deleteCard, fetchAllCardsByListId } from '../controllers/cardController.js';
const router = Router();

//* --------------------------- CARDS

router.get('/cards', fetchAllCards);
router.post('/cards', createCard);

router.get('/cards/:id', fetchOneCard);
router.patch('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);

router.get('/lists/:id/cards', fetchAllCardsByListId);

export { router };
