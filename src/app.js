import express from 'express';
import breedsRouter from './routes/breedsRouter.js';
import factsRouter from './routes/factsRouter.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use('/api', breedsRouter);
app.use('/api', factsRouter);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = server;