import express from 'express';
import { getFacts, getRandomFact } from '../controllers/factsController.js';

const router = express.Router();

router.get('/facts', getFacts);
router.get('/fact', getRandomFact);

export default router;