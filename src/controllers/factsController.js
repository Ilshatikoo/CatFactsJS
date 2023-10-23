import fs from 'fs';

const factsData = fs.readFileSync('./src/data/facts.json');
const facts = JSON.parse(factsData).facts;

const getFacts = (req, res) => {
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
};

const getRandomFact = (req, res) => {
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
};

export { getFacts, getRandomFact };