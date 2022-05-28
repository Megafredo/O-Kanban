import {Router} from 'express';
const router = Router();

// ~ ---------------------------------------------- MAIN ROUTER
import { router as userRouter } from './user.js';
router.use('/', userRouter);

// ~ ---------------------------------------------- CARD ROUTER
import { router as cardRouter } from './card.js';
router.use('/', cardRouter);

// ~ ---------------------------------------------- LIST ROUTER
import { router as listRouter } from './list.js';
router.use('/', listRouter);

// ~ ---------------------------------------------- TAG ROUTER
import { router as tagRouter } from './tag.js';
router.use('/', tagRouter);

export { router };