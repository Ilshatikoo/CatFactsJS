import express from 'express';
import breedsRouter from './routes/breedsRouter.js';
import factsRouter from './routes/factsRouter.js';

const app = express();

app.use(express.json());

app.use('/api', breedsRouter);
app.use('/api', factsRouter);

export default app