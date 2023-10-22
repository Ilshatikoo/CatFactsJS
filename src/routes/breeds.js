import express from 'express';
import fs from 'fs';

const router = express.Router();
const breedsData = fs.readFileSync('./src/data/breeds.json');
const breeds = JSON.parse(breedsData).breeds;

router.get('/breeds', (req, res) => {
  const DEFAULT_LIMIT = 10;
  const DEFAULT_PAGE = 1;

  const limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
  const page = parseInt(req.query.page) || DEFAULT_PAGE;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const response = {
    breeds: breeds.slice(startIndex, endIndex),
    totalPages: Math.ceil(breeds.length / limit),
    currentPage: page
  };

  if (response.breeds.length === 0) {
    res.status(404).json({ error: 'No breeds found' });
  } else {
    res.status(200).json(response);
  }
});

export default router;