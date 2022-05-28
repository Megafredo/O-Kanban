//~ IMPORTATIONS
import { Router } from 'express';
import { fetchAllTags, fetchOneTag, createTag, updateTag, deleteTag, deleteAsWithTag, addAsWithTag, upsertTag, fetchAllTagsByCardId } from '../controllers/tagController.js'
const router = Router();


//^================TAG
router.get('/tags', fetchAllTags);
router.post('/tags', createTag);

router.get('/tags/:id', fetchOneTag);
router.patch('/tags/:id',updateTag);
router.delete('/tags/:id', deleteTag);

router.get('/cards/:id/tags', fetchAllTagsByCardId)
router.put('/cards/:cardId/tags/:tagName', upsertTag);
router.put('/cards/:cardId/tags/:tagId', addAsWithTag);
router.delete('/cards/:cardId/tags/:tagId', deleteAsWithTag);

export { router };