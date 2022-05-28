//~ IMPORTATIONS
import {Router} from 'express';
import { fetchAllLists,createList, fetchOneLIst, updateList, deleteList } from '../controllers/listController.js';
const router = Router();


//* --------------------------- LISTS
router.get('/lists', fetchAllLists);
router.post('/lists', createList);

router.get('/lists/:id', fetchOneLIst);
router.patch('/lists/:id', updateList);
router.delete('/lists/:id', deleteList);


export { router };