import fs from 'fs/promises';

const getFacts = async (req, res) => {
  const limit = parseInt(req.query.limit);

  let response;
  if (limit) {
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
      const factsData = await fs.readFile('./src/data/facts.json', 'utf-8');
      const facts = JSON.parse(factsData).facts;

      response = {
        facts: facts.slice(startIndex, endIndex),
        totalPages: Math.ceil(facts.length / limit),
        currentPage: page
      };
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  } else {
    try {
      const factsData = await fs.readFile('./src/data/facts.json', 'utf-8');
      const facts = JSON.parse(factsData).facts;

      response = {
        facts: facts,
        totalPages: 1,
        currentPage: 1
      };
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }

  res.status(200).json(response);
};

const getRandomFact = async (req, res) => {
  const maxLength = parseInt(req.query.max_length);

  try {
    const factsData = await fs.readFile('./src/data/facts.json', 'utf-8');
    const facts = JSON.parse(factsData).facts;

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
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getFacts, getRandomFact };