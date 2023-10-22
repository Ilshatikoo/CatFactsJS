import express from 'express';
import fs from 'fs';

const router = express.Router();
const factsData = fs.readFileSync('./src/data/facts.json');
const facts = JSON.parse(factsData).facts;

router.get('/facts', (req, res) => {
  const limit = parseInt(req.query.limit);

  let response;
  if (limit) {
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    response = {
      facts: facts.slice(startIndex, endIndex),
      totalPages: Math.ceil(facts.length / limit),
      currentPage: page
    };
  } else {
    response = {
      facts: facts,
      totalPages: 1,
      currentPage: 1
    };
  }

  res.status(200).json(response);
});

router.get('/fact', (req, res) => {
  const maxLength = parseInt(req.query.max_length);

  if (!maxLength) {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    res.status(200).json(randomFact);
  } else {
    const filteredFacts = facts.filter(fact => fact.length <= maxLength);

    if (filteredFacts.length === 0) {
      res.status(404).json({ message: 'Not found' });
    } else {
      const randomFact = filteredFacts[Math.floor(Math.random() * filteredFacts.length)];
      res.status(200).json(randomFact);
    }
  }
});

export default router;