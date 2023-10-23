import express from 'express';
import { getBreeds } from '../controllers/breedsController.js';

const router = express.Router();

router.get('/breeds', getBreeds);

export default router;